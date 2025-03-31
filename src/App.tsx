import Auth from "./components/Auth";
import NavBar from "./components/NavBar/NavBar";
import { useAuth } from "./hooks/useAuth";
import {UserLogin} from "./types/dataUser"

const userLogedIn = new UserLogin("User1234", 15, 8, "example@example.com", true);

function App() {
  const user = useAuth();

  return (
    <>
      <NavBar logoPath="src/assets/logo-text-v2.svg" />

      {userLogedIn ? 
      <div>
        <p className="header-text">Strona główna</p>
        
      </div>
      :
       <div> 
        <div>
        {userLogedIn && <p >Zalogowany jako: {userLogedIn.email}</p>}
        </div>
        <Auth />
      </div>}
      
    </>
  );
}

export default App;
