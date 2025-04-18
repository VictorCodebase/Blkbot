import { getNextImage } from "@/lib/images";
import { postImage } from "@/lib/at";
import { imageCaption, altTextFromImageName } from "@/lib/imageDetail";
import * as dotenv from "dotenv";

dotenv.config();

(async () => {
	const { LAST_IMAGE_NAME: lastImageName } = process.env;
	const nextImage = await getNextImage({ lastImageName });

	await postImage({
		path: nextImage.imageUrl,
		text: imageCaption(),
		altText: altTextFromImageName(nextImage.imageName),
	});
})();
