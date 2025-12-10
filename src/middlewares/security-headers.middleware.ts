import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';
import { type CustomMiddleware } from '@src/middlewares/middlewares-chain';

export function securityHeadersMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();

    const cspHeader = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // For Next.js
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://api.example.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');

    response.headers.set('Content-Security-Policy', cspHeader);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()',
    );

    if (process.env.NODE_ENV === 'production') {
      // Strict-Transport-Security: Tell browsers to use HTTPS exclusively for 1 year
      // includeSubDomains: Apply rule to all subdomains
      // preload: Include site in browser HSTS preload list
      response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload',
      );
    }

    return middleware(request, event, response);
  };
}
