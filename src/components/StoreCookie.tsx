import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";   

const StoreCookie = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");
        setCookie("token", token, {expires: new Date(Date.now() + 604800000), httpOnly: true});
    }, [])

    return <div className="logincontainer">
        
        <div className="loginWindow">

            <>Logged In</>

        </div>
    </div>;
}

export default StoreCookie;