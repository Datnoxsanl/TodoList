import Header from "./Header";
import InforBar from "./InfoBar";


function BaseLayout({children}){

    return(
        <div className="base-layout">
            <Header/>
            <InforBar/>
            <main>{children}</main>
        </div>
    )
}

export default BaseLayout;