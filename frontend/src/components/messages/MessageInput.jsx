import { useState } from "react";  // Mengimpor hook useState untuk mengelola state komponen
import { BsSend } from "react-icons/bs";  // Mengimpor ikon kirim pesan dari react-icons
import useSendMessage from "../../hooks/useSendMessage";  // Mengimpor hook untuk mengirim pesan

const MessageInput = () => {
	// State untuk menyimpan pesan yang sedang diketik
	const [message, setMessage] = useState("");

	// Mendapatkan fungsi dan status loading dari hook useSendMessage
	const { loading, sendMessage } = useSendMessage();

	// Fungsi untuk menangani pengiriman pesan
	const handleSubmit = async (e) => {
		e.preventDefault();  // Mencegah reload halaman saat form disubmit
		if (!message) return;  // Tidak mengirim pesan jika input kosong
		await sendMessage(message);  // Mengirim pesan menggunakan hook
		setMessage("");  // Mengosongkan input setelah pesan terkirim
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				{/* Input untuk mengetik pesan */}
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 bg-[#002366] border-[#002366] text-white'
					placeholder='Kirim Pesan'
					value={message}  // Menghubungkan state message dengan input
					onChange={(e) => setMessage(e.target.value)}  // Memperbarui state saat input berubah
				/>
				{/* Tombol kirim pesan */}
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{/* Menampilkan spinner loading saat pengiriman pesan sedang berlangsung */}
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
