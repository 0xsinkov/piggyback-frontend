import { type NextMiddlewareResult } from 'next/dist/server/web/types';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { type NextResponse } from 'next/server';

export type CustomMiddleware = (
  request: NextRequest,

  event: NextFetchEvent,

  response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

export function middlewaresChain(
  functions: MiddlewareFactory[],
  index = 0,
): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = middlewaresChain(functions, index + 1);

    return current(next);
  }

  return (
    _request: NextRequest,
    _event: NextFetchEvent,
    response: NextResponse,
  ) => {
    return response;
  };
}
