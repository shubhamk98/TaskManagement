import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"; 
import router from "./routes/routes.js";
import cors from "cors";
import { config } from 'dotenv';
config();


mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Database Connected!!!"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  });


const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 3000; 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api/auth", router);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
