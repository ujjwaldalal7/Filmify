import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../utils/auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    const result = registerUser(name, email, password);

    if (!result.success) {
      setMsg(result.message);
      return;
    }

    setMsg("Signup successful! You can login now.");
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="auth-container">
      <h2>Signup</h2>

      {msg && <p style={{ color: "green" }}>{msg}</p>}

      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit" className="auth-btn">Signup</button>
      </form>

      <p className="auth-text">
        Already have an account?{" "}
        <Link to="/login" className="auth-link">Login here</Link>
      </p>
    </div>
  );
}
