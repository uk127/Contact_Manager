import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// Body parser
app.use(express.json());

// MongoDB
const MONGODB_URI = process.env.MONGO_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use("/api/contacts", contactRoutes);

// Health check
app.get("/", (req,res) => res.json({ message: "Contact Manager API is running" }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
