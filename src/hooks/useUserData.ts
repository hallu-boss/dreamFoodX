import { useState } from "react";
import UserData from "../types/UserData"; // Upewnij się, że ścieżka do pliku jest poprawna

export default function useUserData() {
    const [userData, setUserData] = useState(new UserData());

    const preliminaryLogin = (email: string) => {
        setUserData(prev => {
            const updatedUser = new UserData(prev.name, prev.surname, prev.email, prev.cookingHours);
            updatedUser.login(email); 
            return updatedUser;
        });
    };

    return { userData, setUserData, preliminaryLogin };
}