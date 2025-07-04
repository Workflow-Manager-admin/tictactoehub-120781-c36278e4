import React, { useState } from "react";
import { apiLogin } from "../api";

// PUBLIC_INTERFACE
function Login() {
  /** This is the Login page and handles user login flow. */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await apiLogin(username, password);
      window.location = "/lobby";
    } catch (err) {
      setErr(err.message || "Login failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{maxWidth: 400, margin: "40px auto"}}>
      <h2 style={{marginBottom: "1.25rem"}}>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Username"
          value={username}
          style={{ width: "100%", padding: 10, marginBottom: 12 }}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          style={{ width: "100%", padding: 10, marginBottom: 12 }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading} style={{
          background: "var(--primary)", color: "#fff",
          padding: "10px 0", border: "none", borderRadius: 6, width: "100%", fontWeight: 600, fontSize: 16
        }}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {err && <div style={{color:"red", marginTop:8}}>{err}</div>}
        <div style={{marginTop:16}}>No account? <a href="/register">Register</a></div>
      </form>
    </div>
  );
}

export default Login;
