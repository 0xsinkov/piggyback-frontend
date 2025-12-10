'use server';

import 'server-only';
import { deleteCookie } from 'cookies-next';
import { importSPKI, type JWTPayload, jwtVerify, type KeyLike } from 'jose';
import { cookies } from 'next/headers';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  JWT_PUBLIC_KEY_POSTFIX,
  JWT_PUBLIC_KEY_PREFIX,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@src/constants/auth.constants';
import { env } from '@src/env/server';
import { type SessionPayload } from '@src/types/auth.types';

const alg = 'RS512';

const getPublicKey = async (): Promise<KeyLike> => {
  const key = `${JWT_PUBLIC_KEY_PREFIX}
  ${env.JWT_PUBLIC_KEY}
  ${JWT_PUBLIC_KEY_POSTFIX}`;
  return await importSPKI(key, alg);
};

export async function decryptSessionCookie(
  sessionCookieValue: string | undefined,
): Promise<(SessionPayload & JWTPayload) | null> {
  try {
    if (!sessionCookieValue) return null;

    const publicKey = await getPublicKey();

    const { payload } = await jwtVerify<SessionPayload>(
      sessionCookieValue,
      publicKey,
    );

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function decryptAccessToken(
  accessToken: string | undefined,
): Promise<(SessionPayload & JWTPayload) | null> {
  return await decryptSessionCookie(accessToken);
}

export async function verifySession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

    return Boolean(accessToken);
  } catch {
    return false;
  }
}

/**
 * Get session data from the access token
 */
export async function getSessionData(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

    if (accessToken) {
      const payload = await decryptAccessToken(accessToken);

      if (payload) {
        return {
          userId: payload.userId,
          email: payload.email,
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}

export async function clearSession(context: {
  req: any;
  res: any;
}): Promise<void> {
  deleteCookie(ACCESS_TOKEN_COOKIE_NAME, {
    req: context.req,
    res: context.res,
  });
  deleteCookie(REFRESH_TOKEN_COOKIE_NAME, {
    req: context.req,
    res: context.res,
  });
}
