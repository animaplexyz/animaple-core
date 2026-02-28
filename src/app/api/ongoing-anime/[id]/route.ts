import { NextResponse, NextRequest } from "next/server"
import ongoingAnime from "@/utils/ongoingAnime"

export const revalidate = 3600;

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const data = await ongoingAnime(Number(params.id))
  return NextResponse.json({ data: data }, { status: 200 })
}