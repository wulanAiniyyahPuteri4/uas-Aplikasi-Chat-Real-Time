import { useEffect } from "react";  // Mengimpor hook useEffect dari React untuk menjalankan efek samping
import { useSocketContext } from "../context/SocketContext";  // Mengimpor hook untuk mengakses konteks soket (WebSocket)
import useConversation from "../zustand/useConversation";  // Mengimpor hook untuk mengakses dan mengelola percakapan dengan zustand

import notificationSound from "../assets/sounds/notification.mp3";  // Mengimpor file suara untuk notifikasi

// Custom hook untuk mendengarkan pesan baru yang datang melalui soket
const useListenMessages = () => {
	const { socket } = useSocketContext();  // Mendapatkan soket dari konteks SocketContext
	const { messages, setMessages } = useConversation();  // Mendapatkan state dan setter dari zustand untuk percakapan

	// useEffect digunakan untuk mendengarkan pesan baru yang datang melalui soket
	useEffect(() => {
		// Event listener yang mendengarkan event "newMessage"
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;  // Menandai pesan baru dengan flag shouldShake untuk memberi efek getar pada UI
			const sound = new Audio(notificationSound);  // Membuat objek audio untuk memutar suara notifikasi
			sound.play();  // Memainkan suara notifikasi
			setMessages([...messages, newMessage]);  // Menambahkan pesan baru ke daftar pesan yang ada
		});

		// Cleanup function untuk menghapus event listener saat komponen tidak lagi digunakan
		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);  // Menambahkan dependensi untuk memastikan efek dipanggil ulang jika socket, setMessages, atau messages berubah
};

export default useListenMessages;
