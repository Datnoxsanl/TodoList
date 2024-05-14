import { Outlet } from "react-router-dom";
import Header from "./Header";
import InforBar from "./InfoBar";


function BaseLayout(){

    return(
        <div className="base-layout">
            <Header/>
            <InforBar/>
            <main><Outlet></Outlet></main>
        </div>
    )
}

export default BaseLayout;