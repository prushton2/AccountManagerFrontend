import { useState } from "react";
import { APIRequest } from "../lib/ajax";
import queryString from "query-string";
import "./Login.css";
// import { apiResponse } from "../models/apiResponse";
// import { AxiosError } from "axios";

async function loginUser(username: string, password: string) {

}


async function getAPI(apiid: string) {
    let response = await APIRequest.getAPI(apiid);

    if(response.error) {return "Nothing";}
    return response.response.name;
}

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [apiName, setApiName] = useState("");

    // useEffect(() => {
    //     // setApiName(getAPI(useParams));
    // }, []);

    
    const init = async() => {
        const queryParams = new URLSearchParams(window.location.search);
        const apiid = queryParams.get("api");
        if(apiid) {
            setApiName(await getAPI(apiid));
        }
    }

    init();

    return <div className="logincontainer">
        
        <div className="loginWindow">
            Login <br />

            <small>Logging in to {apiName}</small>
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/> <br />
            <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />


            <button className="loginButton" onClick={() => {loginUser(username, password)}}>Log in</button>
        </div>
    </div>;
}

export default Login;