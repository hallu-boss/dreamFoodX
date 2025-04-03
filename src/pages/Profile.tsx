import LoginPage from "./LoginPage";
import UserData from "../types/UserData";
import ProfilePage from "./ProfilePage";

function Profile (
    { userData,
        preliminaryLogin, 
        logoutUser 
    }
        : 
        {
        userData:UserData,
        preliminaryLogin: (email: string) => void,
        logoutUser: () => void }
) {
    let content;

    if (!userData.checkLoginStatus()) {
        content = (
            <div>
                <LoginPage preliminaryLogin={preliminaryLogin}  />
            </div>
        );
    } else {
        content = (
            <div >
                <ProfilePage userData = {userData} logoutUser={logoutUser} />
            </div>
        );
    }

    return <>{content}</>;
}
export default Profile;