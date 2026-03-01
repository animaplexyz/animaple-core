import { NextResponse } from 'next/server';
import batch from '@/utils/batch';

export const revalidate = 604800;

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const resolvedParams = await params;
    const data = await batch(resolvedParams.slug);
    
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ status: "error", message: "Batch tidak ditemukan atau slug salah." }, { status: 404 });
    }

    return NextResponse.json({ status: "success", data });
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}