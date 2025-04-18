// app/api/trigger/route.ts
import { NextResponse } from "next/server";
import { startBot } from "@/lib/bot";

export async function GET() {
	const success = await startBot();

	if (success) {
		return NextResponse.json({ success: true });
	} else {
		console.log(`Failed: returned response:
			success value: ${success}
			`)
		return NextResponse.json({ success: false }, { status: 500 });
	}
}
