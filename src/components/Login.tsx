import { useEffect, useState } from "react";
import { APIRequest, AccountRequest } from "../lib/ajax";
import "./Login.css";
import { AxiosError } from "axios";


async function getAPI(apiid: string) {
    let response = await APIRequest.getAPI(apiid);
    
    if(response.error) {return "Nothing";}
    return response.response.name;
}

const Login = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [apiName, setApiName] = useState("");
    const [apiid, setApiid] = useState("");
        
    async function loginUser() {
        let response;
        try {
            response = await AccountRequest.login(username, password, apiid);
        } catch (e) {
            alert(((e as AxiosError).response?.data as any).error);
            return;
        }
        window.location.href = "https://" + response.response.redirectTo as any;
    }
    
    const init = async() => {
        const queryParams = new URLSearchParams(window.location.search);
        const apiid = queryParams.get("api");
        if(apiid) {
            setApiid(apiid);
            setApiName(await getAPI(apiid));
        }
    }

    useEffect(() => {
        init();
    }, [])

    return <div className="logincontainer">
        
        <div className="loginWindow">

            <>Logging in to <br/>{apiName}</> <br/><br/>
            <input className="bigInput" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/> <br />
            <input className="bigInput" placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />

            <button className="loginButton" onClick={() => {loginUser()}}>Log in</button>


            <br />
            <br />
            <div className="bottomText"><a href="/SignUp">Sign Up</a></div>
        </div>
    </div>;
}

export default Login;