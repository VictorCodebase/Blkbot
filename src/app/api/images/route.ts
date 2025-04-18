// src/app/api/images/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
	try {
		const memesDir = path.resolve("public/imagequeue");
		const files = fs.readdirSync(memesDir);
		const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif|bmp)$/i.test(file));

		return NextResponse.json({ images: imageFiles });
	} catch (error: any) {
		console.error("Error reading images:", error);
		return NextResponse.json({ error: "Error reading images directory." }, { status: 500 });
	}
}
