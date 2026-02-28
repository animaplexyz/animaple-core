import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(30, '1 m'),
});

export async function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const secretKey = request.headers.get('x-animaple-key');
  if (secretKey === process.env.ANIMAPLE_SECRET_KEY) {
    return NextResponse.next();
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp ?? '127.0.0.1');
  
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Terlalu banyak request. Anda telah mencapai batas 30 request per menit. Silakan coba lagi nanti.' 
      },
      { status: 429 }
    );
  }

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', reset.toString());
  
  return response;
}

export const config = {
  matcher: '/api/:path*',
};