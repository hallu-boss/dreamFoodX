// src//LoginPage.tsx
import { useState } from "react";
import {actionButton} from '../components/renderable_elements'
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 
    
    

  const handleSignUp = async () => {
        if (!name || !surname || !email || !password || !repeatPassword) {
            return setError("Wszystkie pola muszą być wypełnione!");
        }

        if (password !== repeatPassword) {
        return setError("Hasła nie są identyczne");
        }

        const userData = {name, surname, email, password};
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
                });
        
            if (!response.ok) {
              const errorData = await response.json();
              return setError(errorData.error || "Błąd podczas rejestracji");
            }
        
            const user = await response.json();
            alert("Rejestracja przebiegła pomyślnie!");
            
            navigate('/')

            return user;
          } 
          catch (error: any) {
            setError("Błąd podczas rejestracji: " + error.message);
          }
        
           
  };

    const backToLoginPage = () => {
        navigate('/login')
    };


    const formFields = ()  => {
        return (
            <>
            <input className="in-box" 
                type="text" placeholder="Imię" onChange={(e) => setName(e.target.value)} />
            <input className="in-box" 
                type="text" placeholder="Nazwisko" onChange={(e) => setSurname(e.target.value)} />
            <input className="in-box" 
                 type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input className="in-box" 
                type="password" placeholder="Hasło" onChange={(e) => setPassword(e.target.value)} />
            <input className="in-box" 
                type="password" placeholder="Powtórz Hasło" onChange={(e) => setRepeatPassword(e.target.value)} />
            </>
        );
    }

  return (
    <div className="page-color">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2 className="header-text">Rejestracja</h2>
      
        {formFields()}

        
        {actionButton("Zarejestruj się", handleSignUp )}
        {actionButton("Anuluj", backToLoginPage )}

    </div>
  );
};

export default RegisterPage;