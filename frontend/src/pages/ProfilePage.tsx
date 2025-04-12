import UserData from "../types/UserData";
import {logOut } from "../services/auth";
import { useState } from "react";
import {actionButton, redirectAndReload} from '../components/renderable_elements'
import { useNavigate } from 'react-router-dom';
import userImg from "../assets/user.png";


const ProfilePage = ({userData, logoutUser} :
    {userData:UserData, 
        logoutUser: () => void}
) => {
    const [error, setError] = useState("");
    const navigate = useNavigate(); // wykorzystywane do przenoszenia się na stronę główną przy logowaniu / wylogowaniu

    // Funkcje do obsługi
    const handleLogOut= async () => {
        try {
          await logOut();
          logoutUser();
          redirectAndReload(navigate);
        } catch (err) {
          setError("Błąd logowania: " + err);
        }
      };


      // Sekcje strony 

      const textIndormationFormat = (header: string, information)   => {
        return (
            <div>
                <div className="green-normal-text">
                    {header}
                </div>
                <div className="my-[1%] text-2xl font-sans ">
                   <span>{information}</span>
                </div>
            </div>
        );
      }

      const profileInformationPart = () => (
          <div className=" grid grid-cols-3 gap-4 ">
              <div className=" p-2 text-center l">
                <div className="bg-[#f1f1f1] w-[95%] h-[60%]">
                    <img src={userImg} alt="Zdjęcie użytkownika" className="w-full h-full object-cover" />
                </div>
                  
              </div>

              <div className="p-6 col-span-2">
                  <div className="header-text">
                      Profil Użytkownika
                  </div>

                  {textIndormationFormat("Imię:", userData.name)}
                  {textIndormationFormat("Nazwisko:", userData.surname)}
                  {textIndormationFormat("Godziny Gotowania:", userData.cookingHours)}
                  {textIndormationFormat("Email:", userData.email)}

                  <div className="py-[5%]">
                      {actionButton("Wyloguj", handleLogOut)}
                        {/* TODO: zmienić handleLogOut na funkcje obsłuującą zmianę hasła */}
                      {actionButton("Zmień Hasło", handleLogOut)}
                  </div>

              </div>
          </div>
      )


      const recipeUserPart = () => {
        return (
            <div className="p-6 ">
                Sekcja 3

            </div>
        );
      }


    return (
        <div className="page-color">
            <div className=" context-box "> 
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="grid grid-rows-2 gap-3 auto-rows-auto">
                        {profileInformationPart()}
                        
                        {recipeUserPart()}
                </div>
            </div>
        </div>
    );
};


export default ProfilePage;