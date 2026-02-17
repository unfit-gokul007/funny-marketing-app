import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/admin/login",
      form
    );

    login(res.data.token); // Save token in context
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 shadow rounded">
        <input
          placeholder="Username"
          className="border p-2 w-full mb-2"
          onChange={e => setForm({...form, username: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          onChange={e => setForm({...form, password: e.target.value})}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
