// Mengimpor express untuk membuat router dan mengatur rute API
import express from "express";

// Mengimpor fungsi getMessages dan sendMessage dari controller untuk menangani permintaan terkait pesan
import { getMessages, sendMessage } from "../controllers/message.controller.js";

// Mengimpor middleware protectRoute untuk melindungi route dari akses tidak sah
import protectRoute from "../middleware/protectRoute.js";

// Membuat instance router dari express
const router = express.Router();

// Rute untuk mengambil pesan berdasarkan ID percakapan
// Menggunakan metode GET untuk mendapatkan pesan dari percakapan tertentu
// Middleware protectRoute digunakan untuk memastikan pengguna sudah terautentikasi
router.get("/:id", protectRoute, getMessages);

// Rute untuk mengirim pesan ke percakapan berdasarkan ID percakapan
// Menggunakan metode POST untuk mengirim pesan
// Middleware protectRoute digunakan untuk memastikan pengguna sudah terautentikasi
router.post("/send/:id", protectRoute, sendMessage);

// Mengekspor router agar bisa digunakan di bagian lain aplikasi
export default router;
