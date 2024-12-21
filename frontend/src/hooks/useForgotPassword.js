import { useState } from "react";
import toast from "react-hot-toast";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const sendResetEmail = async (email) => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.error) {
        
        throw new Error(data.error);
      }

      toast.success("Reset password link sent to your email");
    } catch (error) {
      console.log("error")
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, forgotPassword: sendResetEmail };
};

export default useForgotPassword;

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
