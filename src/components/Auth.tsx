// src/components/Auth.tsx
import { useState } from "react";
import { signIn, signUp, logOut } from "../services/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      alert("Zarejestrowano!");
    } catch (err) {
      setError("Błąd rejestracji: " + err);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      alert("Zalogowano!");
    } catch (err) {
      setError("Błąd logowania: " + err);
    }
  };

  return (
    <div>
      <h2>Firebase Auth</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Hasło" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Zarejestruj</button>
      <button onClick={handleSignIn}>Zaloguj</button>
      <button onClick={logOut}>Wyloguj</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Auth;
