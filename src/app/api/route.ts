import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      name: "Animaple Core API",
      description: "Unofficial Otakudesu REST API",
      version: "1.0.0",
      author_name: "Ofikur R.",
      author_url: "https://github.com/ofikur",
      website_url: "https://animaple-core.vercel.app",
      documentation_url: "https://animaple-core.vercel.app/docs",
      github_url: "https://github.com/ofikur/animaple-core",
      source_target: "Otakudesu",
      otakudesu_heartbeat: {
        status: "HEALTHY",
        down: false,
        timestamp: new Date().toISOString(),
      }
    },
    { status: 200 }
  );
}