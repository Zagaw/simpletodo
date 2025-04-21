import express, { json } from "express";
import dotenv from "dotenv";
import { connectDb } from "./db";
import todoRoutes from "./routes/todo";
import cors from "cors";

dotenv.config({
    path : ".env",
});

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(json());

app.use(todoRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    connectDb();
    console.log("Server is running on : " + PORT);
})