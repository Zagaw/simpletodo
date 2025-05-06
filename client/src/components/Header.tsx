import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useLogoutMutation } from "../slices/userApi";
import { clearUserInfo } from "../slices/auths";

function Header() {

    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [Logout, {isLoading}] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await Logout({});
            dispatch(clearUserInfo());
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="flex my-10 items-center justify-between">
            <Link to={"/"} className="text-3xl font-bold">Simpleshare</Link>
            <div className="space-x-4">
                {
                    userInfo ? 
                    (<>
                        <Link to={"/profile"} className="px-4 py-2 border">Profile</Link>
                        <button type="button" className="text-white bg-black px-4 py-2 border" onClick={logoutHandler} disabled={isLoading}>Logout</button>
                    </>) :
                    (<>
                        <Link to={"/login"} className="text-white bg-black px-4 py-2 border">Login</Link>
                        <Link to={"/register"} className="px-4 py-2 border">Register</Link>
                    </>)
                }
            </div>
        </nav>
    )
}

export default Header;