import { useState } from "react";  // Mengimpor useState hook dari React untuk mengelola state loading
import toast from "react-hot-toast";  // Mengimpor library toast untuk menampilkan pesan kesalahan
import { useAuthContext } from "../context/AuthContext";  // Mengimpor custom hook untuk mengakses konteks autentikasi

// Custom hook untuk menangani proses login pengguna
const useLogin = () => {
	const [loading, setLoading] = useState(false);  // State untuk melacak status loading saat proses login
	const { setAuthUser } = useAuthContext();  // Mendapatkan setter untuk menyimpan data pengguna yang terautentikasi

	// Fungsi login untuk mengotentikasi pengguna
	const login = async (username, password) => {
		// Validasi input username dan password
		const success = handleInputErrors(username, password);
		if (!success) return;  // Jika input tidak valid, hentikan proses login

		setLoading(true);  // Mengatur state loading menjadi true saat proses login dimulai
		try {
			// Mengirim permintaan POST ke API login
			const res = await fetch("/api/auth/login", {
				method: "POST",  // Metode HTTP POST
				headers: { "Content-Type": "application/json" },  // Menyertakan header yang sesuai untuk JSON
				body: JSON.stringify({ username, password }),  // Mengirimkan data login (username, password) dalam bentuk JSON
			});

			const data = await res.json();  // Menangani respons dari server dan mengubahnya menjadi JSON
			if (data.error) {  // Jika server mengirimkan error
				throw new Error(data.error);  // Melemparkan error untuk ditangani di blok catch
			}

			// Jika login berhasil, menyimpan data pengguna di localStorage dan mengupdate konteks autentikasi
			localStorage.setItem("chat-user", JSON.stringify(data));  // Menyimpan data pengguna yang berhasil login
			setAuthUser(data);  // Mengupdate state autentikasi dengan data pengguna
		} catch (error) {
			// Menangani error dan menampilkan notifikasi kesalahan
			toast.error(error.message);  // Menampilkan pesan kesalahan dengan menggunakan toast
		} finally {
			setLoading(false);  // Mengubah state loading menjadi false setelah proses login selesai
		}
	};

	return { loading, login };  // Mengembalikan status loading dan fungsi login untuk digunakan oleh komponen lain
};
export default useLogin;

// Fungsi untuk memvalidasi input username dan password
function handleInputErrors(username, password) {
	if (!username || !password) {  // Jika username atau password kosong
		toast.error("Harap isi semua kolom");  // Menampilkan pesan kesalahan menggunakan toast
		return false;  // Mengembalikan false, menandakan ada kesalahan input
	}

	return true;  // Mengembalikan true jika input valid
}
