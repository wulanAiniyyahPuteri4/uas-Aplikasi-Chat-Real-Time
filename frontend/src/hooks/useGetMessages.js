import { useEffect, useState } from "react";  // Mengimpor hook dari React
import useConversation from "../zustand/useConversation";  // Mengimpor hook dari zustand untuk mengelola state percakapan
import toast from "react-hot-toast";  // Mengimpor pustaka toast untuk menampilkan notifikasi kesalahan

// Custom hook untuk mengambil daftar pesan berdasarkan percakapan yang dipilih
const useGetMessages = () => {
	// State untuk mengelola status loading saat data pesan sedang dimuat
	const [loading, setLoading] = useState(false);
	// Mendapatkan state pesan dan percakapan yang dipilih dari zustand
	const { messages, setMessages, selectedConversation } = useConversation();

	// useEffect digunakan untuk melakukan fetch data saat percakapan yang dipilih berubah
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);  // Menandakan bahwa data pesan sedang dimuat
			try {
				// Melakukan request fetch ke API untuk mendapatkan pesan dalam percakapan yang dipilih
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();  // Mengonversi respons ke format JSON
				if (data.error) throw new Error(data.error);  // Jika terdapat error pada respons, lemparkan error
				setMessages(data);  // Jika berhasil, simpan pesan ke state menggunakan setMessages
			} catch (error) {
				// Menampilkan pesan kesalahan menggunakan toast jika terjadi error
				toast.error(error.message);
			} finally {
				setLoading(false);  // Set loading ke false setelah data berhasil diambil atau terjadi error
			}
		};

		// Memastikan hanya melakukan fetch jika percakapan yang dipilih ada (_id tidak null)
		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);  // Efek dipanggil setiap kali percakapan yang dipilih berubah

	// Mengembalikan state messages dan loading agar bisa digunakan oleh komponen lain
	return { messages, loading };
};

export default useGetMessages;
