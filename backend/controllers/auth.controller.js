import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Fungsi untuk mendaftarkan pengguna baru
export const signup = async (req, res) => {
	try {
		// Destrukturisasi data dari permintaan (request) body
		const { fullName, username, password, confirmPassword, gender } = req.body;
// Validasi apakah password dan confirmPassword cocok
		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Kata sandi tidak sesuai" });
		}
	// Cek apakah username sudah digunakan di database
		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Nama pengguna sudah dipakai" });
		}
// Hashing kata sandi dengan bcrypt
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		// Membuat objek user baru dengan data yang diberikan
		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "laki-laki" ? boyProfilePic : girlProfilePic,
		});

		// Jika user berhasil dibuat, lakukan langkah berikut
		if (newUser) {
			// Membuat token JWT dan menyimpan dalam cookie
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();// Menyimpan pengguna baru ke database 

			// Mengirimkan respons berhasil
			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			// Jika user gagal dibuat
			res.status(400).json({ error: "Data pengguna tidak valid" });
		}
	} catch (error) {
		// Menangani error yang terjadi
		console.log("Error di daftar controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Fungsi untuk login pengguna
export const login = async (req, res) => {
	try {
		// Destrukturisasi data dari permintaan (request) body
		const { username, password } = req.body;
		// Mencari pengguna berdasarkan username
		const user = await User.findOne({ username });
		// Memeriksa apakah kata sandi cocok dengan yang di-hash di database
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		// Jika user tidak ditemukan atau kata sandi salah
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Nama pengguna atau kata sandi tidak valid" });
		}
// Membuat token JWT dan menyimpannya dalam cookie
		generateTokenAndSetCookie(user._id, res);
// Mengirimkan data pengguna yang berhasil login
		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		// Menangani error yang terjadi
		console.log("Error controller masuk", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


// Fungsi untuk logout pengguna
export const logout = (req, res) => {
	try {
			// Menghapus token JWT dari cookie
		res.cookie("jwt", "", { maxAge: 0 });
		// Mengirimkan respons berhasil logout
		res.status(200).json({ message: "Berhasil keluar" });
	} catch (error) {
		// Menangani error yang terjadi
		console.log("Error controller keluar", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
