// Mengimpor Server dari pustaka 'socket.io' untuk membuat server WebSocket
import { Server } from "socket.io";

// Mengimpor http untuk membuat server HTTP
import http from "http";

// Mengimpor express untuk membuat aplikasi server
import express from "express";

// Membuat aplikasi express
const app = express();

// Membuat server HTTP menggunakan express
const server = http.createServer(app);

// Mengonfigurasi Server Socket.IO dan menghubungkannya dengan server HTTP
const io = new Server(server, {
	// Mengonfigurasi CORS untuk mengizinkan koneksi dari origin tertentu (misalnya frontend di localhost:3000)
	cors: {
		origin: ["http://localhost:3000"], // Hanya mengizinkan koneksi dari localhost:3000
		methods: ["GET", "POST"], // Mengizinkan metode GET dan POST untuk komunikasi
	},
});

// Fungsi untuk mendapatkan socketId penerima berdasarkan userId
export const getReceiverSocketId = (receiverId) => {
	// Mengembalikan socketId dari userSocketMap berdasarkan userId
	return userSocketMap[receiverId];
};

// Membuat objek untuk menyimpan mapping antara userId dan socketId
const userSocketMap = {}; // {userId: socketId}

// Menangani koneksi baru dari klien
io.on("Terhubung", (socket) => {
	// Menampilkan pesan ketika pengguna berhasil terhubung, dengan menampilkan socketId pengguna
	console.log("Pengguna Terhubung", socket.id);

	// Mendapatkan userId dari query parameter saat pengguna terhubung
	const userId = socket.handshake.query.userId;

	// Jika userId tidak "undefined", menyimpan mapping antara userId dan socketId ke dalam userSocketMap
	if (userId != "Belum Terdefinisi") userSocketMap[userId] = socket.id;

	// Mengirimkan daftar pengguna yang sedang online kepada semua klien terhubung
	io.emit("Ambil Daftar Pengguna Online", Object.keys(userSocketMap));

	// Mendengarkan event 'disconnect' ketika pengguna terputus
	socket.on("Terputus", () => {
		// Menampilkan pesan ketika pengguna terputus, dengan menampilkan socketId pengguna
		console.log("Pemutusan Pengguna", socket.id);

		// Menghapus userId dan socketId yang terhubung dari userSocketMap
		delete userSocketMap[userId];

		// Mengirimkan pembaruan daftar pengguna online kepada semua klien yang terhubung
		io.emit("Ambil Daftar Pengguna Online", Object.keys(userSocketMap));
	});
});

// Mengekspor app, io (socket.io instance), dan server untuk digunakan di file lain
export { app, io, server };
