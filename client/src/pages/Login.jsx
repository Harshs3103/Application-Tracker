import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || err.response.data.message);
      } else {
        setError("Cannot reach server");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form onSubmit={handleSubmit} className="card w-96 bg-base-100 shadow-xl p-8 gap-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {error && <div className="alert alert-error text-sm">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">Login</button>

        <p className="text-center text-sm">
          New here? <Link to="/signup" className="link link-primary">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;