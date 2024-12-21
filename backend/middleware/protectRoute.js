// Mengimpor pustaka jwt untuk memverifikasi token JWT dan model User untuk mengambil data pengguna
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware untuk melindungi route dengan memeriksa apakah pengguna terautentikasi
const protectRoute = async (req, res, next) => {
	try {
		// Mengambil token JWT dari cookie (dengan nama 'jwt')
		const token = req.cookies.jwt;

		// Jika token tidak ada, kembalikan respon dengan status 401 (Unauthorized)
		if (!token) {
			return res.status(401).json({ error: "Tidak diizinkan - Token tidak tersedia" });
		}

		// Verifikasi token dengan secret key yang ada di environment variable
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Jika token tidak valid atau tidak dapat didekode, kembalikan respon error
		if (!decoded) {
			return res.status(401).json({ error: "Tidak diizinkan - Token tidak tersedia" });
		}

		// Mencari pengguna berdasarkan userId yang didekodekan dari token
		const user = await User.findById(decoded.userId).select("-password");

		// Jika pengguna tidak ditemukan, kembalikan respon dengan status 404 (Not Found)
		if (!user) {
			return res.status(404).json({ error: "Pengguna tidak ditemukan" });
		}

		// Menyimpan data pengguna ke objek request (req) untuk digunakan di route yang dilindungi
		req.user = user;

		// Lanjutkan ke middleware berikutnya
		next();
	} catch (error) {
		// Menangkap error jika terjadi kesalahan selama proses
		console.log("Kesalahan di protectRoute middleware: ", error.message);

		// Mengembalikan respon dengan status 500 (Internal Server Error) jika terjadi kesalahan
		res.status(500).json({ error: "Internal server error" });
	}
};

// Mengekspor middleware protectRoute agar bisa digunakan di route lain
export default protectRoute;
