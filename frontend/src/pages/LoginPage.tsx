// src//LoginPage.tsx
import { useState } from "react";
import {actionButton, redirectAndReload} from '../components/renderable_elements'
import { useNavigate } from 'react-router-dom';


const LoginPage = (
    { preliminaryLogin }: { preliminaryLogin: (email: string) => void }
) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // wykorzystywane do przenoszenia się na stronę główną przy logowaniu / wylogowaniu

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Wypełnij wszystkie pola!");
      return;
    }
    const userLoginInformation = {email, password};

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userLoginInformation),
        });
    

        let data;
        try {
          data = await response.json();
        } catch (parseError) {
          data = null;
        }

        if (!response.ok) {
          return setError(data?.error || "Błąd logowania");
        }
        const token = data.token;
        localStorage.setItem("token", token);

        redirectAndReload(navigate);

      } 
      catch (error: any) {
        setError("Błąd podczas rejestracji: " + error.message);
      }
      preliminaryLogin(email);
      alert("Zalogowano!");
      redirectAndReload(navigate);
  };

  const handleSignUp = () => {
    navigate("/registration")
  }

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