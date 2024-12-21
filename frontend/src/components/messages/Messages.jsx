import { useEffect, useRef } from "react";  // Mengimpor hook useEffect dan useRef dari React
import useGetMessages from "../../hooks/useGetMessages";  // Hook untuk mengambil pesan dari server
import MessageSkeleton from "../skeletons/MessageSkeleton";  // Komponen skeleton loading untuk pesan
import Message from "./Message";  // Komponen untuk menampilkan pesan individual
import useListenMessages from "../../hooks/useListenMessages";  // Hook untuk mendengarkan pesan baru secara real-time

const Messages = () => {
	// Mengambil pesan dan status loading dari hook useGetMessages
	const { messages, loading } = useGetMessages();
	// Menggunakan hook untuk mendengarkan pesan baru yang masuk secara real-time
	useListenMessages();
	// Membuat referensi untuk menggulir ke pesan terakhir
	const lastMessageRef = useRef();

	// useEffect untuk menggulir ke pesan terakhir setelah pesan baru ditambahkan
	useEffect(() => {
		setTimeout(() => {
			// Scroll ke elemen pesan terakhir setelah pesan baru diterima
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);  // Menunggu sebentar untuk memastikan pesan baru dimuat
	}, [messages]);  // Efek ini dipicu setiap kali daftar pesan berubah

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{/* Jika tidak sedang loading dan ada pesan */}
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						{/* Menampilkan pesan menggunakan komponen Message */}
						<Message message={message} />
					</div>
				))}

			{/* Jika sedang loading, tampilkan skeleton loading untuk pesan */}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{/* Jika tidak ada pesan dan tidak sedang loading, tampilkan pesan ini */}
			{!loading && messages.length === 0 && (
				<p className='text-center'> Kirim pesan untuk memulai percakapan</p>
			)}
		</div>
	);
};
export default Messages;
