import fs from "fs";
import path from "path";

// Path to the image context file where the last image data is stored
const imageContextFilePath = "./imageContext.json";

type GetNextImageOptions = {
	lastImageName: string | undefined;
};

type NextImage = {
	imageName: string;
	imageUrl: string;
	loopedAround: boolean;
};

// Utility function to read and parse the image context JSON
async function getImageContext(): Promise<{ lastImageName: string } | null> {
	try {
		const data = fs.readFileSync(imageContextFilePath, "utf-8");
		if (data) {
			return JSON.parse(data);
		}
		else return null
	} catch (error) {
		console.error("Error reading image context:", error);
		return null;
	}
}

// Utility function to update the image context JSON with the latest image
async function updateImageContext(imageName: string): Promise<void> {
	const newImageContext = { lastImageName: imageName };
	fs.writeFileSync(imageContextFilePath, JSON.stringify(newImageContext, null, 2));
}

async function getNextImage(_options?: GetNextImageOptions): Promise<NextImage> {
	// Fetch the list of images from the API route
	const baseUrl = process.env.DEPLOYED === "true" ? "https://your-vercel-app.vercel.app" : "http://localhost:3000";
	const res = await fetch(`${baseUrl}/api/images`);
	const data = await res.json();

	if (!data.images || data.images.length === 0) {
		throw new Error("No image files found.");
	}

	// Read the last posted image from the imageContext.json
	const imageContext = await getImageContext();
	const lastImageName = imageContext?.lastImageName;

	// Filter out the last image selected if provided
	const availableImages = lastImageName ? data.images.filter((image: string) => image !== lastImageName) : data.images;

	if (availableImages.length === 0) {
		// If no images are left after filtering, you can loop back around or return an error
		throw new Error("No images available to select.");
	}

	// Randomly select an image from the available images
	const randomIndex = Math.floor(Math.random() * availableImages.length);
	const imageName = availableImages[randomIndex];

	// URL to access the image from the public directory
	const imageUrl = `public/imagequeue/${imageName}`;

	return {
		imageName,
		imageUrl,
		loopedAround: false, // You can set this to true if you loop back around after filtering
	};
}

// Exporting the functions to use them elsewhere
export { getNextImage, updateImageContext };
