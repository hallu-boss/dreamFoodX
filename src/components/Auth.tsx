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
      <h2 className="header-text">Logowanie</h2>

      <input className="in-box"
       type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="in-box" 
        type="password" placeholder="Hasło" onChange={(e) => setPassword(e.target.value)} />
      <button className="btn md:flex hidden right-full mr-5 items-center " onClick={handleSignUp}>
              Zarejestruj
      </button>
      <button className="btn items-center" onClick={handleSignIn}>
            Zaloguj
      </button>
      <button className="btn md:flex  hidden right-full mr-5 " onClick={logOut}>
            Wyloguj
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Auth;
