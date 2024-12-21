import { useEffect, useState } from "react";  // Mengimpor hook dari React
import toast from "react-hot-toast";  // Mengimpor pustaka toast untuk menampilkan notifikasi kesalahan

// Custom hook untuk mendapatkan daftar percakapan dari API
const useGetConversations = () => {
	// State untuk mengatur status loading saat data sedang dimuat
	const [loading, setLoading] = useState(false);
	// State untuk menyimpan daftar percakapan
	const [conversations, setConversations] = useState([]);

	// useEffect digunakan untuk melakukan fetch data saat komponen pertama kali dimuat
	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);  // Menandakan bahwa data sedang dimuat
			try {
				// Melakukan request fetch ke API untuk mendapatkan daftar percakapan
				const res = await fetch("/api/users");
				const data = await res.json();  // Mengonversi respons ke format JSON
				if (data.error) {  // Jika terdapat error pada respons, lemparkan error
					throw new Error(data.error);
				}
				setConversations(data);  // Jika sukses, set daftar percakapan ke state
			} catch (error) {
				// Menampilkan pesan kesalahan menggunakan toast jika terjadi error
				toast.error(error.message);
			} finally {
				setLoading(false);  // Set loading ke false setelah data berhasil diambil atau terjadi error
			}
		};

		// Memanggil fungsi getConversations untuk mengambil data
		getConversations();
	}, []);  // Dependensi kosong berarti efek ini hanya dipanggil sekali saat komponen dimuat

	// Mengembalikan state loading dan conversations agar dapat digunakan oleh komponen lain
	return { loading, conversations };
};

export default useGetConversations;
