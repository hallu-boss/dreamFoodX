import { useState, useEffect  } from "react";
import UserData from "../types/UserData"; // Upewnij się, że ścieżka do pliku jest poprawna



export default function useUserData() {
    const [userData, setUserData] = useState<UserData>(new UserData());
    

    // Inicjalizowanie userData z localStorage przy starcie aplikacji
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
            const updatedUser = new UserData("Test", "Tester", prev.email, 1234);
            updatedUser.login(email); 
            // TODO: pobranie danych o użytkowniku z bazy danych



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