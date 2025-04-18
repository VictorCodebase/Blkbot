// app/api/trigger/route.ts
import { NextResponse } from "next/server";
import { startBot } from "@/lib/bot";

export async function GET() {
	startBot().catch(console.error); // fire-and-forget
	return NextResponse.json({ message: "instruction sent" });
}
