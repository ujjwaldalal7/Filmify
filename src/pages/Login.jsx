import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const result = loginUser(email, password);

    if (!result.success) {
      setMsg("Invalid email or password!");
      return;
    }

    navigate("/");
  }

  return (
  <div className="auth-container">
    <h2>Login</h2>

    {msg && <p className="error-msg">{msg}</p>}

    <form onSubmit={handleLogin} className="auth-form">

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="auth-btn">Login</button>
    </form>

    <p className="auth-text">
      Don't have an account?{" "}
      <Link to="/signup" className="auth-link">Signup here</Link>
    </p>
  </div>
);
}