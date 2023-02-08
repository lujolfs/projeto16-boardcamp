import express from "express";
import categoriesRouter from "./routes/categories.routes.js";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(categoriesRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`))