import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import coffeeRouter from "./routes/coffeeRoute.js";
import userRouter from "./routes/userRoute.js";
import googleAuthRouter from "./routes/googleAuthRoute.js";
import "dotenv/config.js";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/api/coffee", coffeeRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/auth", googleAuthRouter);

app.get("/", (req, res) => {
  res.send("Api Working");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
