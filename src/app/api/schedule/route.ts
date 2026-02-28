import { NextResponse } from "next/server"
import schedule from "@/utils/schedulte"

export const revalidate = 3600;

export async function GET() {
  const data = await schedule()
  return NextResponse.json({ data: data }, { status: 200 })
}
