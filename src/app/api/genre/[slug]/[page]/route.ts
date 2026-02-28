import { NextResponse } from 'next/server';
import animeByGenre from '@/utils/animeByGenre';

export const revalidate = 3600;

export async function GET(request: Request, { params }: { params: Promise<{ slug: string, page: string }> }) {
  try {
    const resolvedParams = await params;
    const data = await animeByGenre(resolvedParams.slug, resolvedParams.page);
    
    return NextResponse.json({ status: "success", data });
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}