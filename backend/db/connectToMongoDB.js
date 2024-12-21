// Mengimpor mongoose untuk berinteraksi dengan MongoDB
import mongoose from "mongoose";

// Fungsi untuk menghubungkan ke MongoDB secara asinkron
const connectToMongoDB = async () => {
	try {
		// Mencoba untuk terhubung ke MongoDB menggunakan URI yang disimpan di environment variable
		await mongoose.connect(process.env.MONGO_DB_URI);
		
		// Jika koneksi berhasil, mencetak pesan sukses ke console
		console.log("Berhasil terhubung ke MongoDB");
	} catch (error) {
		// Jika terjadi kesalahan saat menghubungkan, mencetak pesan kesalahan ke console
		console.log("Kesalahan saat menghubungkan ke MongoDB", error.message);
	}
};

// Mengekspor fungsi connectToMongoDB agar bisa digunakan di file lain
export default connectToMongoDB;
