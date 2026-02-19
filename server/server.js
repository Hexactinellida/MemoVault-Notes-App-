import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import noteRouter from "./routes/noteRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
// Connect to MongoDB
connectDB();

app.get('/', (req,res) => res.send("API working") )
app.use('/api/auth', authRouter)    // /api/auth/register   || /api/auth/login  ...
app.use('/api/user', userRouter)
app.use('/api/note', noteRouter)

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
