import { NextResponse, NextRequest } from "next/server"
import episode from "@/utils/episode";

export async function GET(request: NextRequest, props: { params: Promise<{ slug: string; episode: string }> }) {
  const params = await props.params;
  const urlParts = request.url.split("/")
  const animeSlug = urlParts[5]
  const data = await episode({ animeSlug: animeSlug, episodeNumber: Number(params.episode) })
  return NextResponse.json({ data: data }, { status: 200 })
}