import { NextResponse, NextRequest } from "next/server";
import home from "@/utils/home";

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const data = await home();
  return NextResponse.json({ data: data }, { status: 200 });
}