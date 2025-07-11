import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/connectDb.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from "./routes/projectRoutes.js";

const app = express();
const PORT = process.env.PORT || 10000;

//middlewares
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true, }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Database connection
connectDb();

//Root route
app.get("/", (req, res) => {
    res.send("Hello World");
});

//routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});