// Mengimpor mongoose untuk berinteraksi dengan MongoDB
import mongoose from "mongoose";

// Mendefinisikan schema untuk model User (pengguna)
const userSchema = new mongoose.Schema(
	{
		// Field fullName untuk menyimpan nama lengkap pengguna
		fullName: {
			type: String, // Tipe data adalah string
			required: true, // Field ini wajib diisi
		},

		// Field username untuk menyimpan nama pengguna (username)
		username: {
			type: String, // Tipe data adalah string
			required: true, // Field ini wajib diisi
			unique: true, // Nama pengguna harus unik, tidak boleh ada dua pengguna dengan nama yang sama
		},

		// Field password untuk menyimpan kata sandi pengguna
		password: {
			type: String, // Tipe data adalah string
			required: true, // Field ini wajib diisi
			minlength: 6, // Password harus memiliki panjang minimal 6 karakter
		},

		// Field gender untuk menyimpan jenis kelamin pengguna
		gender: {
			type: String, // Tipe data adalah string
			required: true, // Field ini wajib diisi
			enum: ["male", "female"], // Nilai yang diterima hanya "male" atau "female"
		},

		// Field profilePic untuk menyimpan URL gambar profil pengguna
		profilePic: {
			type: String, // Tipe data adalah string
			default: "", // Nilai default adalah string kosong jika tidak ada gambar profil
		},
	},
	// Menambahkan opsi timestamps agar MongoDB secara otomatis menyimpan waktu pembuatan dan pembaruan pengguna
	{ timestamps: true }
);

// Membuat model User berdasarkan schema yang telah didefinisikan
const User = mongoose.model("User", userSchema);

// Mengekspor model User agar dapat digunakan di bagian lain aplikasi
export default User;
