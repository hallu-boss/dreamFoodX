import UserData from "../types/UserData";
import {logOut } from "../services/auth";
import { useState } from "react";
import {actionButton} from '../components/renderable_elements'
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({userData, logoutUser} :
    {userData:UserData, 
        logoutUser: () => void}
) => {
    const [error, setError] = useState("");
    const navigate = useNavigate(); // wykorzystywane do przenoszenia się na stronę główną przy logowaniu / wylogowaniu

    
    const handleLogOut= async () => {
        try {
          await logOut();
          logoutUser();
          navigate('/')
        } catch (err) {
          setError("Błąd logowania: " + err);
        }
      };

    return (
        <div className="page-color" >
            {error && <p style={{ color: "red" }}>{error}</p>}

            <h1>Profil Użytkownika</h1>
            <div>
                <strong>Imię:</strong> <span>{userData.name}</span>
            </div>
            <div>
                <strong>Nazwisko:</strong> <span>{userData.surname}</span>
            </div>
            <div>
                <strong>Godziny Gotowania:</strong> <span>{userData.cookingHours}</span>
            </div>
            <div>
                <strong>Email:</strong> <span>{userData.email}</span>
            </div>

            {actionButton("Wyloguj", handleLogOut)}
        
        </div>
    );
};


export default ProfilePage;