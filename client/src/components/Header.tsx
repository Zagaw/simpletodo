import { Link } from "react-router-dom";

function Header() {

    return (
        <nav className="flex my-10 items-center justify-between">
            <Link to={"/"} className="text-3xl font-bold">Simpleshare</Link>
            <div className="space-x-5">
            <Link to={"/login"} className="text-white bg-black px-4 py-2 border">Login</Link>
            <Link to={"/register"} className="px-4 py-2 border">Register</Link>
            </div>
        </nav>
    )
}

export default Header;