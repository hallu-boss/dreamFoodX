import { UserLogin } from "../types/dataUser";
import Auth from "../components/Auth";


function Profile ({userLogged} : {userLogged:UserLogin}) {
    let content;

    if (!userLogged.checkLoginStatus()) {
        content = (
            <div>
                <Auth />
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