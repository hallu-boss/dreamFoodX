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

        <div className="flex justify-center">
          <button className="btn btn-size tems-center" onClick={handleSignUp}>
                Zarejestruj
          </button>
        </div>

        <div className="flex justify-center">
          <button className="btn btn-size items-center" onClick={handleSignIn}>
              Zaloguj
          </button>
        </div>

{/*         
        <div className="flex justify-center">
          <button className="btn btn-size tems-center" onClick={logOut}>
              Wyloguj
          </button>
        </div>
       */}
      
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Auth;
