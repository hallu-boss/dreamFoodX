import Auth from "./components/Auth";
import NavBar from "./components/NavBar/NavBar";
import { useAuth } from "./hooks/useAuth";
import {UserLogin} from "./types/dataUser"
import {MainView} from "./components/mainView"

const userLogedIn = new UserLogin("User1234", 15, 8, "example@example.com", true);
// const userLogedIn = null;

function App() {
  const user = useAuth();

  return (
    <>
      <NavBar logoPath="src/assets/logo-text-v2.svg" />

      {userLogedIn ? 
      <div>
        <MainView userLogedIn={userLogedIn} />
      </div>
      :
      <div>   
        <Auth />
      </div>}
      
    </>
  );
}

export default App;
