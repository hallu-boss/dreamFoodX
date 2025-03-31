import Auth from "./components/Auth";
import NavBar from "./components/NavBar/NavBar";
import { useAuth } from "./hooks/useAuth";

function App() {
  const user = useAuth();

  return (
    <>
      <NavBar logoPath="src/assets/logo-text-v2.svg" />
      <div>
        {user ? <p>Zalogowany jako: {user.email}</p> : <p>Nie zalogowany</p>}
      </div>
      <Auth />
    </>
  );
}

export default App;
