import React, { useState } from "react";

// PUBLIC_INTERFACE
function Register() {
  /** This is the Register page and handles user sign up flow. */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  // Dummy API endpoint, replace with actual backend
  const API_REGISTER = "/api/register"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      // Replace this fetch call with actual API endpoint and logic
      setSuccess(true);
      setTimeout(() => (window.location = "/login"), 1600);
    } catch (err) {
      setErr("Registration failed. Try again.");
    }
  };

  return (
    <div style={{maxWidth: 400, margin: "40px auto"}}>
      <h2 style={{marginBottom: "1.25rem"}}>Register</h2>
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
        <button type="submit" style={{
          background: "var(--secondary)", color: "#fff",
          padding: "10px 0", border: "none", borderRadius: 6, width: "100%", fontWeight: 600, fontSize: 16
        }}>
          Register
        </button>
        {err && <div style={{ color: "red", marginTop: 8 }}>{err}</div>}
        {success && <div style={{ color: "green", marginTop: 8 }}>Registration successful! Redirecting...</div>}
        <div style={{marginTop:16}}>Already have an account? <a href="/login">Login</a></div>
      </form>
    </div>
  );
}

export default Register;
