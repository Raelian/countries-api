import {Outlet, useLocation} from "react-router-dom";
import Header from "../Header/Header.tsx";

const Layout = () => {
    const location = useLocation();

    const currentPage = {
        "/": "home-page",
        "/details": "details-page",
    }[location.pathname] || "home-page";

    return(
        <div className={currentPage}>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout;