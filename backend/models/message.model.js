// Mengimpor mongoose untuk berinteraksi dengan MongoDB
import mongoose from "mongoose";

// Mendefinisikan schema untuk model Message (pesan)
const messageSchema = new mongoose.Schema(
	{
		// Field senderId untuk menyimpan ID pengirim pesan, yang mengacu pada model 'User'
		senderId: {
			type: mongoose.Schema.Types.ObjectId, // Tipe data adalah ObjectId
			ref: "User", // Mengacu pada model 'User' untuk ID pengguna pengirim
			required: true, // Field ini wajib ada
		},

		// Field receiverId untuk menyimpan ID penerima pesan, yang mengacu pada model 'User'
		receiverId: {
			type: mongoose.Schema.Types.ObjectId, // Tipe data adalah ObjectId
			ref: "User", // Mengacu pada model 'User' untuk ID pengguna penerima
			required: true, // Field ini wajib ada
		},

		// Field message untuk menyimpan teks pesan
		message: {
			type: String, // Tipe data adalah string
			required: true, // Field ini wajib ada
		},
	},
	// Menambahkan option timestamps untuk secara otomatis menyimpan waktu pembuatan dan pembaruan pesan
	{ timestamps: true }
);

// Membuat model Message berdasarkan schema yang telah didefinisikan
const Message = mongoose.model("Message", messageSchema);

// Mengekspor model Message agar bisa digunakan di bagian lain aplikasi
export default Message;
