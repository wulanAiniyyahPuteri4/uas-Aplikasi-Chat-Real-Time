import { useSocketContext } from "../../context/SocketContext";  // Mengimpor context untuk mengakses informasi socket
import useConversation from "../../zustand/useConversation";  // Mengimpor hook untuk mengelola state percakapan yang sedang dipilih

// Komponen Conversation untuk menampilkan percakapan dalam daftar percakapan
const Conversation = ({ conversation, lastIdx, emoji }) => {
	// Mengambil state percakapan yang sedang dipilih dan fungsi untuk mengubahnya
	const { selectedConversation, setSelectedConversation } = useConversation();

	// Memeriksa apakah percakapan ini adalah percakapan yang dipilih saat ini
	const isSelected = selectedConversation?._id === conversation._id;
	// Mengambil daftar pengguna yang sedang online dari SocketContext
	const { onlineUsers } = useSocketContext();
	// Memeriksa apakah percakapan ini memiliki pengguna yang sedang online
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			{/* Div utama percakapan */}
			<div
				className={`flex gap-2 items-center hover:bg-[#d98695] rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-[#d98695]" : ""}  // Jika percakapan ini dipilih, beri background biru
				`}
				// Menetapkan percakapan yang dipilih saat pengguna mengklik percakapan
				onClick={() => setSelectedConversation(conversation)}
			>
				{/* Menampilkan avatar percakapan, menambahkan status "online" jika pengguna online */}
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						{/* Gambar avatar percakapan */}
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				{/* Menampilkan nama percakapan dan emoji jika ada */}
				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>{emoji}</span>  {/* Menampilkan emoji */}
					</div>
				</div>
			</div>

			{/* Jika percakapan ini bukan percakapan terakhir dalam daftar, tampilkan divider */}
			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};

export default Conversation;
