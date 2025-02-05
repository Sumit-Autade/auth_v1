import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = "https://auth-v1-1gd1.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/forgot-password`, { email });
      setMessage(res.data.msg);
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Forgot Password</h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
