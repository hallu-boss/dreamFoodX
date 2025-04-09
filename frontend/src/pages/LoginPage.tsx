// src//LoginPage.tsx
import { useState } from "react";
import { signIn } from "../services/auth";
import {actionButton} from '../components/renderable_elements'
import { useNavigate } from 'react-router-dom';


const LoginPage = (
    { preliminaryLogin }: { preliminaryLogin: (email: string) => void }
) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // wykorzystywane do przenoszenia się na stronę główną przy logowaniu / wylogowaniu

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      preliminaryLogin(email);
      alert("Zalogowano!");
      navigate('/')
    } catch (err) {
      setError("Błąd logowania: " + err);
    }
  };

  

  return (
    <div className="page-color">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2 className="header-text">Logowanie</h2>
      <input className="in-box"
       type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="in-box" 
        type="password" placeholder="Hasło" onChange={(e) => setPassword(e.target.value)} />


        {actionButton("Zaloguj", handleSignIn)}
        {actionButton("Zarejestruj", handleSignUp)}

    </div>
  );
};

export default LoginPage;