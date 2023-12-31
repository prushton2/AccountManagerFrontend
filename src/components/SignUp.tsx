import { useState } from "react";
import { AccountRequest } from "../lib/ajax";
import "./Login.css";
import { AxiosError } from "axios";



const SignUp = () => {
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [success, setSuccess] = useState(false);
            
    async function SignUp() {
        if(password != password2) {
            alert("Passwords arent the same");
            return;
        }

        if(!password || !username || !email) {
            alert("No fields can be blank");
            return;
        }

        
        try {
            await AccountRequest.singup(username, password, email);
        } catch (e) {
            let err = e as AxiosError;
            alert(((err.response?.data) as any).error);
            return;
        }

        setSuccess(true);
        setTimeout(() => {
            window.location.href = `/login?api=${import.meta.env.VITE_SERVICE_API_ID}`;
        }, 2000);
    }
    
    return <div className="logincontainer">
        
        <div className="loginWindow">
            <>Sign Up</><br/><br/>
            <input className="bigInput" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/> <br />
            <input className="bigInput" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input className="bigInput" placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />
            <input className="bigInput" placeholder="Repeat Password" onChange={(e) => setPassword2(e.target.value)} type="password" />


            <button className="loginButton" onClick={() => {SignUp()}}>Sign Up</button>

            <br />
            <br />
            <br />
            <br />
            <div className="bottomText">{success ? "Account Created" : ""}</div>
        </div>
    </div>;
}

export default SignUp;