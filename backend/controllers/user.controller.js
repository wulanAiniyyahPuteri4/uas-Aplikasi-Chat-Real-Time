import User from "../models/user.model.js"; // Model User untuk berinteraksi dengan data pengguna di database

// Fungsi untuk mendapatkan daftar pengguna yang ditampilkan di sidebar
export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id; // Mendapatkan ID pengguna yang sedang login dari token autentikasi

		// Mencari semua pengguna kecuali pengguna yang sedang login
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }) // Filter pengguna dengan ID tidak sama dengan pengguna yang login
			.select("-password"); // Tidak menyertakan field password dalam hasil query

		// Mengembalikan daftar pengguna sebagai respons dengan status 200
		res.status(200).json(filteredUsers);
	} catch (error) {
		// Menangani kesalahan dan mengembalikan respons error
		console.error("Kesalahan di getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" }); // Respons error server dengan status 500
	}
};
