import { NextResponse, NextRequest } from "next/server"
import completeAnime from "@/utils/completeAnime";

export const revalidate = 604800;

export async function GET(request: NextRequest, props: { params: Promise<{ page: string }> }) {
  const params = await props.params;
  const data = await completeAnime(Number(params.page))
  return NextResponse.json({ data: data }, { status: 200 })
}