import { useAuthContext } from "../../context/AuthContext";  // Mengimpor context untuk mendapatkan data pengguna yang sedang login
import { extractTime } from "../../utils/extractTime";  // Mengimpor fungsi untuk memformat waktu
import useConversation from "../../zustand/useConversation";  // Mengimpor hook untuk mendapatkan data percakapan yang dipilih

const Message = ({ message }) => {
	// Mendapatkan data pengguna yang sedang login dari context
	const { authUser } = useAuthContext();

	// Mendapatkan data percakapan yang dipilih dari Zustand store
	const { selectedConversation } = useConversation();

	// Menentukan apakah pesan ini berasal dari pengguna yang sedang login (authUser)
	const fromMe = message.senderId === authUser._id;

	// Memformat waktu pengiriman pesan menggunakan fungsi extractTime
	const formattedTime = extractTime(message.createdAt);

	// Menentukan kelas CSS untuk chat berdasarkan apakah pesan berasal dari pengguna yang sedang login
	const chatClassName = fromMe ? "chat-end" : "chat-start";

	// Menentukan foto profil yang akan ditampilkan (foto profil pengguna atau lawan bicara)
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

	// Menentukan warna latar belakang bubble pesan jika berasal dari pengguna yang sedang login
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	// Menentukan apakah pesan harus bergoyang (shake), berdasarkan properti 'shouldShake' pada pesan
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>  {/* Menentukan sisi chat (kanan/kiri) */}
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					{/* Menampilkan gambar profil */}
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
				{/* Menampilkan isi pesan dengan gaya bubble */}
				{message.message}
			</div>
			{/* Menampilkan waktu pengiriman pesan */}
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};

export default Message;
