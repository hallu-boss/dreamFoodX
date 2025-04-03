import { useState, useEffect  } from "react";
import UserData from "../types/UserData";

export default function useUserData() {
    const [userData, setUserData] = useState<UserData>(new UserData());

    useEffect(() => {
        // Odczyt danych użytkownika z localStorage
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
          const parsedData = JSON.parse(savedUserData);
          console.log('Parsed saved user data:', parsedData);
          
          // Jeśli dane są poprawne, zaktualizuj stan
          if (parsedData && typeof parsedData.email === 'string') {
            setUserData(new UserData(parsedData.name, parsedData.surname, parsedData.email, parsedData.cookingHours, parsedData.isLoggedIn));
          }
        }
      }, []);


    const preliminaryLogin = (email: string) => {
        setUserData(prev => {
            const updatedUser = new UserData(prev.name, prev.surname, prev.email, prev.cookingHours);
            updatedUser.login(email); 

            // Zapisz dane użytkownika do localStorage
            localStorage.setItem('userData', JSON.stringify(updatedUser));

            return updatedUser;
        });
    };

    const logOut = () => {
        setUserData(prev => {
            const updatedUser = new UserData(prev.name, prev.surname, prev.email, prev.cookingHours);
            updatedUser.logout();
            localStorage.removeItem('userData');
            return updatedUser;
        });
    };

    return { userData, setUserData, preliminaryLogin, logOut };
}
