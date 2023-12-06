import "./Account.css"
import { useState } from "react"
import { APIRequest } from "../lib/ajax";
import { AxiosError } from "axios";


export default function CreateAPI() {

    const [name, setName] = useState("");
    const [returnAddress, setReturnAddress] = useState("");

    const create = async() => {``
        try {
            await APIRequest.createAPI(name, returnAddress);
        } catch (e) {
            alert(((e as AxiosError).response as any).error)
        }

        alert("API Created");
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    }

    return (
    <div className="container">
        <div className="infobox">
            <div className="title">Create API</div> <br />
            
            <div className="sidebyside">
                <div style={{margin: "10px"}}> 
                    Name:<br />
                    <small>This will be shown to <br />users when logging in</small> <br /><br />
                    Return Address:<br />
                    <small>This is where users will <br />be sent after logging in</small>
                </div>

                <div style={{margin: "10px"}}> 
                    <input onChange={(e) => setName(e.target.value)}></input><br /><br /><br /><br />
                    <input onChange={(e) => setReturnAddress(e.target.value)}></input>
                </div>
            </div>
            <br /><br /><br />
            <div className="rightAlign">
                <button onClick={() => {create()}} style={{margin: "0px auto"}}>Create</button>
            </div>
        </div>
    </div>);
};