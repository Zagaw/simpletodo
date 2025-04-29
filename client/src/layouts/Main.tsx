import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Main() {

    return (
        <div className="max-w-4xl mx-auto">
            <Header/>
            <Outlet/>
        </div>
    )
}

export default Main;