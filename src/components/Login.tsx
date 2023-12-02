import { useEffect, useState } from "react";
import { APIRequest, AccountRequest } from "../lib/ajax";
import "./Login.css";
import { AxiosError } from "axios";
// import { apiResponse } from "../models/apiResponse";
// import { AxiosError } from "axios";



async function getAPI(apiid: string) {
    let response = await APIRequest.getAPI(apiid);
    
    if(response.error) {return "Nothing";}
    return response.response.name;
}

const Login = () => {
    
    const [username, setUsername] = useState("prushton");
    const [password, setPassword] = useState("<insert sha here>");
    
    const [apiName, setApiName] = useState("");
    const [apiid, setApiid] = useState("");
    
    // useEffect(() => {
        //     // setApiName(getAPI(useParams));
        // }, []);
        
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
            {/* Login <br /> */}

            <>Logging in to <br/>{apiName}</> <br/><br/>
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/> <br />
            <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />


            <button className="loginButton" onClick={() => {loginUser()}}>Log in</button>
        </div>
    </div>;
}

export default Login;