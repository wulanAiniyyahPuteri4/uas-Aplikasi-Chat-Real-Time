import jwt from "jsonwebtoken";

// Fungsi untuk menghasilkan token JWT dan mengaturnya sebagai cookie pada respons
const generateTokenAndSetCookie = (userId, res) => {
	// Membuat token JWT dengan userId sebagai payload dan masa berlaku 15 hari
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d", // Token akan berlaku selama 15 hari
	});

	// Mengatur cookie 'jwt' dengan token yang telah dibuat
	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // Mengatur umur cookie (15 hari dalam milidetik)
		httpOnly: true, // Mengatur cookie agar tidak bisa diakses oleh JavaScript (mencegah serangan XSS)
		sameSite: "strict", // Mengatur cookie untuk hanya dikirim dalam konteks yang aman (mencegah CSRF)
		secure: process.env.NODE_ENV !== "development", // Mengatur cookie agar hanya dikirim melalui HTTPS di produksi
	});
};

export default generateTokenAndSetCookie;
