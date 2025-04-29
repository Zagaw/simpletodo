import express, { json } from "express";
import dotenv from "dotenv";
import { connectDb } from "./db";
import todoRoutes from "./routes/todo";
import userRoutes from "./routes/user"
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config({
    path : ".env",
});

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(json());
app.use(cookieParser());

app.use(userRoutes);
app.use(todoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    connectDb();
    console.log("Server is running on : " + PORT);
})