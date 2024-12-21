import { useEffect } from "react";  // Mengimpor hook useEffect untuk side effect di komponen
import useConversation from "../../zustand/useConversation";  // Mengimpor hook Zustand untuk mengelola percakapan yang dipilih
import MessageInput from "./MessageInput";  // Mengimpor komponen input pesan
import Messages from "./Messages";  // Mengimpor komponen untuk menampilkan pesan
import { TiMessages } from "react-icons/ti";  // Mengimpor ikon untuk tampilan pesan
import { useAuthContext } from "../../context/AuthContext";  // Mengimpor context untuk mendapatkan informasi pengguna yang sedang login

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();  // Mengambil data percakapan yang dipilih dan setter untuk mengubahnya

	// Menggunakan useEffect untuk membersihkan percakapan yang dipilih ketika komponen di-unmount
	useEffect(() => {
		return () => setSelectedConversation(null);  // Membersihkan percakapan yang dipilih
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{/* Jika tidak ada percakapan yang dipilih, tampilkan pesan ini */}
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header percakapan dengan nama penerima */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					{/* Komponen untuk menampilkan pesan */}
					<Messages />
					{/* Komponen untuk mengirim pesan */}
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();  // Mengambil data pengguna yang sedang login dari context
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				{/* Menampilkan pesan selamat datang */}
				<p>Selamat Datang 👋 {authUser.fullName} ❄</p>
				{/* Memberi instruksi untuk memilih percakapan */}
				<p>Pilih obrolan untuk memulai pengiriman pesan</p>
				{/* Ikon pesan untuk memperjelas tampilan */}
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
