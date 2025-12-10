import { authMiddleware } from '@src/middlewares/auth.middleware';
import { middlewaresChain } from '@src/middlewares/middlewares-chain';
import { securityHeadersMiddleware } from '@src/middlewares/security-headers.middleware';

// eslint-disable-next-line import/no-default-export -- Ignored because it's a Next.js middleware
export default middlewaresChain([securityHeadersMiddleware, authMiddleware]);

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
