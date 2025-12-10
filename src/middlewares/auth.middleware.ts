import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';
import { PATHNAME_HEADER } from '@src/constants/routes.constants';
import { type CustomMiddleware } from '@src/middlewares/middlewares-chain';

export function authMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const currentPath = request.nextUrl.pathname;

    const response = NextResponse.next();

    const headers = new Headers(request.headers);
    headers.set(PATHNAME_HEADER, currentPath);
    response.headers.set(PATHNAME_HEADER, currentPath);

    return middleware(request, event, response);
  };
}
