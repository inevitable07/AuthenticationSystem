import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("✅Database connected successfully");
        });

        connection.on("error", (err) => {
            console.error("❌Database connection error:", err);
            process.exit();
        });
        
    } catch (error) {
        console.error("❌Database connection error:", error);
    }

}