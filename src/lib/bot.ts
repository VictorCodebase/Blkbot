import { postImage } from "@/lib/at";
import { getNextImage } from "@/lib/images";
import { imageCaption, altTextFromImageName } from "@/lib/imageDetail";
// lib/bot.ts

export async function startBot() {
	console.log("Bot triggered")
	try {
		const { imageName, imageUrl } = await getNextImage();
		const caption = imageCaption();
		const imagAlt = altTextFromImageName(imageName);

		console.log(`Bot posting:
			post path: ${imageUrl}
			image alt: ${imagAlt}
			post caption: ${caption}
			`);

		await postImage({
			path: imageUrl,
			text: caption,
			altText: imagAlt,
		});
		console.log("post complete")
		return true
	} catch (error) {
		console.error("Error posting image:", error);
		return false
	}
}
