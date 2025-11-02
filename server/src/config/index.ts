import mongoose from "mongoose";
import "dotenv/config"; // loads .env once here

export const connectMongo = async () => {
	const uri = process.env.MONGO_URI as string;
	if (!uri) throw new Error("MONGO_URI missing in env");

	// strictQuery false quietens deprecation notice
	mongoose.set("strictQuery", false);

	try {
		await mongoose.connect(uri);
		console.log("[mongo] Connected");
	} catch (err: any) {
		console.error("[mongo] Connection failed:", err.message);
		console.error("[mongo] Make sure MongoDB is running on:", uri);
		console.error("[mongo] See server/SETUP.md for installation instructions");
		throw err;
	}
};
