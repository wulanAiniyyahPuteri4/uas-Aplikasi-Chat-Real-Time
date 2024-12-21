// Mengimpor mongoose untuk berinteraksi dengan MongoDB
import mongoose from "mongoose";

// Mendefinisikan schema untuk model Conversation (percakapan)
const conversationSchema = new mongoose.Schema(
	{
		// Array yang menyimpan ID peserta percakapan
		participants: [
			{
				// Tipe data peserta adalah ObjectId yang mengacu pada model 'User'
				type: mongoose.Schema.Types.ObjectId,
				ref: "User", // Mengacu pada model 'User' untuk referensi ke pengguna yang terlibat
			},
		],

		// Array yang menyimpan ID pesan-pesan dalam percakapan
		messages: [
			{
				// Tipe data pesan adalah ObjectId yang mengacu pada model 'Message'
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message", // Mengacu pada model 'Message' untuk referensi ke pesan yang dikirim dalam percakapan
				default: [], // Nilai default adalah array kosong jika belum ada pesan
			},
		],
	},
	// Menambahkan option timestamps untuk secara otomatis menyimpan waktu pembuatan dan pembaruan percakapan
	{ timestamps: true }
);

// Membuat model Conversation berdasarkan schema yang telah didefinisikan
const Conversation = mongoose.model("Conversation", conversationSchema);

// Mengekspor model Conversation agar bisa digunakan di bagian lain aplikasi
export default Conversation;
