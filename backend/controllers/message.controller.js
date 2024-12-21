import Conversation from "../models/conversation.model.js"; // Model untuk percakapan, digunakan untuk menyimpan data percakapan
import Message from "../models/message.model.js"; // Model untuk pesan, digunakan untuk menyimpan data pesan
import { getReceiverSocketId, io } from "../socket/socket.js"; // Utilitas socket.io untuk menangani komunikasi real-time

// Fungsi untuk mengirim pesan
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body; // Mengambil isi pesan dari request body
		const { id: receiverId } = req.params; // Mengambil ID penerima dari parameter URL
		const senderId = req.user._id; // Mendapatkan ID pengirim dari data pengguna yang telah diautentikasi

		// Mencari percakapan yang melibatkan pengirim dan penerima
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] }, // Memastikan percakapan melibatkan kedua ID
		});

		// Jika percakapan belum ada, buat percakapan baru
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId], // Tambahkan pengirim dan penerima sebagai peserta
			});
		}

		// Membuat pesan baru
		const newMessage = new Message({
			senderId, // ID pengirim pesan
			receiverId, // ID penerima pesan
			message, // Isi pesan
		});

		// Jika pesan berhasil dibuat, tambahkan ID pesan ke dalam percakapan
		if (newMessage) {
			conversation.messages.push(newMessage._id); // Tambahkan ID pesan ke dalam array pesan percakapan
		}

		// Menyimpan percakapan dan pesan secara paralel untuk efisiensi
		await Promise.all([conversation.save(), newMessage.save()]);

		// Fungsionalitas socket.io untuk memberi tahu penerima tentang pesan baru
		const receiverSocketId = getReceiverSocketId(receiverId); // Mendapatkan ID socket penerima
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage); // Emit event 'newMessage' ke penerima
		}

		// Mengembalikan pesan baru sebagai respons
		res.status(201).json(newMessage);
	} catch (error) {
		// Menangani kesalahan dan mengembalikan respons error
		console.log("Kesalahan di controller sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Fungsi untuk mengambil semua pesan dalam percakapan
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params; // Mengambil ID pengguna yang diajak chat dari parameter URL
		const senderId = req.user._id; // Mendapatkan ID pengirim dari data pengguna yang telah diautentikasi

		// Mencari percakapan yang melibatkan pengirim dan pengguna yang diajak chat
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] }, // Memastikan kedua ID ada dalam percakapan
		}).populate("messages"); // Populasi (ambil data detail) semua pesan dalam percakapan

		// Jika percakapan tidak ditemukan, kembalikan array kosong
		if (!conversation) return res.status(200).json([]);

		// Ambil semua pesan dari percakapan
		const messages = conversation.messages;

		// Mengembalikan pesan sebagai respons
		res.status(200).json(messages);
	} catch (error) {
		// Menangani kesalahan dan mengembalikan respons error
		console.log("Kesalahan di controller getMessages : ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
