import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 2. Change the API call to /auth/signup
      // Including name if your signup controller expects it, or just email and password
      await api.post("/auth/signup", { name, email, password });
      
      // 3. On success, navigate to login without saving token
      navigate("/login");
    } catch (err) {
      // Check the error key using the fallback logic
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
        {/* 4. Change heading to "Sign up" */}
        <h1 className="text-2xl font-bold text-center">Sign up</h1>

        {error && <div className="alert alert-error text-sm">{error}</div>}

        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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

        {/* 4. Change button text to "Sign up" */}
        <button type="submit" className="btn btn-primary">Sign up</button>

        {/* 4. Change bottom link to point to login */}
        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="link link-primary">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;