import React, { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const provider = new GoogleAuthProvider();

  // Inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      console.error("Error with Google Login:", error.message);
      setErrorMessage(error.message);
    }
  };

  // Inicio de sesión con correo y contraseña
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setErrorMessage(error.message);
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "0 auto",
      padding: "20px",
      textAlign: "center",
      fontFamily: "'Roboto', sans-serif",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      backgroundColor: "#fff",
    },
    title: {
      fontSize: "24px",
      marginBottom: "20px",
      fontWeight: "500",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#4285f4",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    googleButton: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #4285f4",
      backgroundColor: "#fff",
      color: "#4285f4",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#357ae8",
    },
    googleButtonHover: {
      backgroundColor: "#e8f0fe",
    },
    error: {
      color: "red",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Login
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        style={styles.googleButton}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.googleButtonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.googleButton.backgroundColor)}
      >
        Login with Google
      </button>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
