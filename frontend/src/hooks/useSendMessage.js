import { useState } from "react";  // Mengimpor hook useState dari React untuk mengelola state
import useConversation from "../zustand/useConversation";  // Mengimpor hook untuk mengakses state percakapan yang disimpan di zustand store
import toast from "react-hot-toast";  // Mengimpor pustaka untuk menampilkan notifikasi toast

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);  // Menggunakan state untuk mengelola status loading saat mengirim pesan
	const { messages, setMessages, selectedConversation } = useConversation();  // Mengambil data pesan dan percakapan yang dipilih dari store zustand

	// Fungsi untuk mengirim pesan
	const sendMessage = async (message) => {
		setLoading(true);  // Mengatur status loading menjadi true saat mulai mengirim pesan
		try {
			// Mengirim permintaan POST untuk mengirim pesan ke server
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",  // Menggunakan metode POST untuk mengirim data
				headers: {
					"Content-Type": "application/json",  // Menyatakan bahwa data yang dikirimkan adalah dalam format JSON
				},
				body: JSON.stringify({ message }),  // Mengirimkan pesan dalam format JSON
			});
			const data = await res.json();  // Mengambil data respon dalam format JSON
			if (data.error) throw new Error(data.error);  // Jika ada error, lemparkan error

			// Menambahkan pesan yang berhasil dikirim ke daftar pesan yang ada
			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);  // Menampilkan pesan error jika terjadi masalah
		} finally {
			setLoading(false);  // Mengatur status loading menjadi false setelah selesai
		}
	};

	// Mengembalikan fungsi sendMessage dan status loading
	return { sendMessage, loading };
};
export default useSendMessage;
