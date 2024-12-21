import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import resetPasswordRoutes from "./routes/resetPassword.routes.js"; // Tambahkan jika ada file routes untuk forgot-password/reset-password

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Memungkinkan aplikasi untuk menangani data JSON di req.body
app.use(cookieParser());

// Menentukan rute untuk otentikasi, pesan, dan pengguna
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reset-password", resetPasswordRoutes); // Handle forgot-password dan reset-password

// Serve static files for frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Menyajikan file statis untuk frontend yang telah dibangun di folder /frontend/dist
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Menjalankan server pada port yang ditentukan dan menghubungkan ke MongoDB
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
