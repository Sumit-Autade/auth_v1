import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import ForgotPassword from "./utils/ForgotPassword";
import ResetPassword from "./utils/ResetPassword";

const API_URL = "https://auth-v1-1gd1.onrender.com";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      setEmailError(emailRegex.test(value) ? "" : "Invalid email format");
    }

    if (name === "password") {
      setPasswordError(
        passwordRegex.test(value)
          ? ""
          : "Password must be at least 8 characters, include uppercase, lowercase, digit, and special character"
      );
    }
  };
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setEmailError(""); 
    if (emailError) return;
    try {
      const res = await axios.post(`${API_URL}/login`, form, {
        withCredentials: true,
      });

      setUser(res.data?.user);

      if (res.data.user?.profile) {
        console.log("User has a profile");
      }
      // toast.success("Sign-up successful!");
      navigate("/dashboard");
    } catch (err) {
      setEmailError(err.response?.data?.message || "An error occurred");
    }
  };

  const googleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        <form onSubmit={login} className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <input
            className="w-full p-2 border rounded"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          <button
            className={`w-full text-white p-2 rounded ${
              emailError
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            type="submit"
          >
            Login
          </button>
        </form>
        <button
          onClick={googleLogin}
          className="w-full mt-3 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Login with Google
        </button>
        <div className="mt-4 text-center">
          <p>
            <Link to="/forgot-password" className="text-blue-500">
              Forgot Password?
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const Signup = ({ setUser }) => {
  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  const [passwordError, setPasswordError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "password") {
      setPasswordError(
        passwordRegex.test(value)
          ? ""
          : "Password must be at least 8 characters, include uppercase, lowercase, digit, and special character"
      );
    }
  };

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/signup`, form);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.msg);
    }
  };

  const googleSignup = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Sign Up</h2>
        <form onSubmit={register} className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="userName"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          <button
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={googleSignup}
          className="w-full mt-3 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Sign Up with Google
        </button>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// const Home = ({ user, logout }) => (
//   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//     <h1 className="text-3xl font-bold mb-6">Authentication System</h1>
//     <div>
//       <Link
//         to="/login"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Login
//       </Link>
//       <Link
//         to="/"
//         className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600"
//       >
//         Sign Up
//       </Link>
//     </div>
//   </div>
// );

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/user`, { withCredentials: true })
      .then((response) => setUser(response.data));
  }, []);

  const logout = async () => {
    await axios.get(`${API_URL}/logout`, { withCredentials: true });
    setUser(null);
  };

  return (
    <Router>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <Routes>
        <Route path="/" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
