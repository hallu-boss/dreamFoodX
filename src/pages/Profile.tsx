import LoginPage from "./LoginPage";
import UserData from "../types/UserData";

function Profile (
    { userData,
        preliminaryLogin, 
        logoutUser }: 
        
        {userData:UserData,
             preliminaryLogin: (email: string) => void,
              logoutUser: () => void }
) {
    let content;

    if (!userData.checkLoginStatus()) {
        content = (
            <div>
                <LoginPage preliminaryLogin={preliminaryLogin} logoutUser={logoutUser} />
            </div>
        );
    } else {
        content = (
            <div>
                <p>profile users</p>
            </div>
        );
    }

    return <>{content}</>;
}
export default Profile;