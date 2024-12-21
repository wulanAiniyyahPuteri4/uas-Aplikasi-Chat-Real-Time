// Mengimpor express untuk membuat router dan mengatur rute API
import express from "express";

// Mengimpor middleware protectRoute untuk melindungi route dari akses tidak sah
import protectRoute from "../middleware/protectRoute.js";

// Mengimpor fungsi getUsersForSidebar dari controller untuk mendapatkan daftar pengguna untuk sidebar
import { getUsersForSidebar } from "../controllers/user.controller.js";

// Membuat instance router dari express
const router = express.Router();

// Rute untuk mendapatkan daftar pengguna untuk sidebar
// Menggunakan metode GET untuk mengambil data pengguna
// Middleware protectRoute digunakan untuk memastikan pengguna sudah terautentikasi
router.get("/", protectRoute, getUsersForSidebar);

// Mengekspor router agar bisa digunakan di bagian lain aplikasi
export default router;
