import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Bounce, ToastContainer } from "react-toastify";

function Main() {

    return (
        <div className="max-w-4xl mx-auto">
            <ToastContainer position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}/>
            <Header/>
            <Outlet/>
        </div>
    )
}

export default Main;