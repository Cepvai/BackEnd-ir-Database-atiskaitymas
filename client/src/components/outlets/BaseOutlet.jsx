import { Outlet } from "react-router-dom";
import Header from "../ul/organisms/Header";
import Footer from "../ul/organisms/Footer";

const BaseOutlet = () => {
    return ( 
        <>
         <Header />
         <Outlet />
         <Footer />
        </>
     );
}
 
export default BaseOutlet;