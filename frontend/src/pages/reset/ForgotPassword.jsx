import { useState } from "react";
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const { loading, forgotPassword } = useForgotPassword();
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setMessage("Please enter a valid email address.");
			return;
		}
		
		const response = await forgotPassword(email);
		if (response.success) {
			setMessage("Password reset link has been sent to your email.");
		} else {
			setMessage("Error sending reset link. Please try again.");
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full sm:w-1/2 p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>Forgot Password</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Email Address</span>
						</label>
						<input
							type='email'
							placeholder='Enter your email'
							className='w-full input input-bordered h-10'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading || !email}>
							{loading ? <span className='loading loading-spinner'></span> : "Submit"}
						</button>
					</div>
				</form>
				{message && <p className='text-center text-gray-500'>{message}</p>}
			</div>
		</div>
	);
};

export default ForgotPassword;
