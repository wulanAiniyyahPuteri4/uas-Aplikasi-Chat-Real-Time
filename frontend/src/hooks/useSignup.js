import { useState } from "react";  // Mengimpor useState untuk mengelola state
import toast from "react-hot-toast";  // Mengimpor pustaka untuk menampilkan toast notifications
import { useAuthContext } from "../context/AuthContext";  // Mengimpor context untuk mengelola otentikasi pengguna

const useSignup = () => {
	const [loading, setLoading] = useState(false);  // Mengelola state loading saat pendaftaran sedang berlangsung
	const { setAuthUser } = useAuthContext();  // Mengambil fungsi untuk mengatur data pengguna yang terautentikasi dari context

	// Fungsi untuk menangani pendaftaran
	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		// Validasi input sebelum mengirim permintaan
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;  // Jika validasi gagal, tidak melanjutkan ke proses pendaftaran

		setLoading(true);  // Mengatur status loading menjadi true saat proses pendaftaran dimulai
		try {
			// Mengirimkan permintaan POST ke server untuk melakukan pendaftaran
			const res = await fetch("/api/auth/signup", {
				method: "POST",  // Metode untuk mengirim data
				headers: { "Content-Type": "application/json" },  // Menyatakan bahwa data yang dikirim berupa JSON
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),  // Mengirimkan data pendaftaran
			});

			const data = await res.json();  // Mengambil respon dari server dalam format JSON
			if (data.error) {
				throw new Error(data.error);  // Jika ada error dalam data, lemparkan error
			}

			// Menyimpan data pengguna yang baru didaftarkan di localStorage dan mengatur pengguna di context
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);  // Menyimpan data pengguna yang berhasil masuk ke dalam state aplikasi
		} catch (error) {
			toast.error(error.message);  // Menampilkan pesan error jika terjadi kesalahan
		} finally {
			setLoading(false);  // Mengatur status loading menjadi false setelah proses selesai
		}
	};

	// Mengembalikan objek yang berisi status loading dan fungsi signup
	return { loading, signup };
};
export default useSignup;

// Fungsi untuk memvalidasi input form pendaftaran
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	// Memeriksa apakah ada kolom yang kosong
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Harap isi semua kolom");  // Menampilkan error jika ada kolom kosong
		return false;
	}

	// Memeriksa apakah password dan konfirmasi password cocok
	if (password !== confirmPassword) {
		toast.error("Kata sandi tidak cocok");  // Menampilkan error jika kata sandi tidak cocok
		return false;
	}

	// Memeriksa panjang kata sandi minimal 6 karakter
	if (password.length < 6) {
		toast.error("Kata sandi harus minimal 6 karakter");  // Menampilkan error jika kata sandi kurang dari 6 karakter
		return false;
	}

	// Jika semua pemeriksaan berhasil, kembalikan true
	return true;
}
