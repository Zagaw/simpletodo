import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";

function Header() {

    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    return (
        <nav className="flex my-10 items-center justify-between">
            <Link to={"/"} className="text-3xl font-bold">Simpleshare</Link>
            <div className="space-x-5">
                {
                    userInfo ? (<button type="button" className="text-white bg-black px-4 py-2 border">Logout</button>) :
                    (<div>
                        <Link to={"/login"} className="text-white bg-black px-4 py-2 border">Login</Link>
                        <Link to={"/register"} className="px-4 py-2 border">Register</Link>
                    </div>)
                }
            </div>
        </nav>
    )
}

export default Header;