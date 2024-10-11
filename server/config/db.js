import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://test:test123@cluster0.fvbni.mongodb.net/coffee-shop"
    )
    .then(() => console.log("DB Connected"));
};
