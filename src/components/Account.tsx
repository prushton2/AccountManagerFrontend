import { useEffect, useState } from "react"
import { FilteredAccount } from "../models/FilteredAcount"
import { APIRequest, AccountRequest } from "../lib/ajax";
import { useCookies } from "react-cookie";
import "./Account.css"
import { AxiosError } from "axios";
import { API } from "../models/API";

async function generateAPIKey(apiid: string): Promise<string | null> {

    if(!confirm("When you generate an API Key, you will only be able to view it once for security reasons. Continue?")) {
        return null;
    }
    
    let response;
    try {
        response = await APIRequest.generateAPIKey(apiid);
    } catch (e) {
        alert(((e as AxiosError).response as any).error);
        return null;
    }

    alert(`Your API Key:\n${response.response}\nThis cannot be viewed again.`);
    return null;
}


export default function AccountPage() {

    const [account, setAccount] = useState<FilteredAccount>();
    const [cookies] = useCookies(["token"]);
    const [ownedAPIsHTML, setOwnedAPIsHTML] = useState<JSX.Element[]>([]);
    const [selectedAPI, setSelectedAPI] = useState<number>(0);
    const [selectAPIDropdown, setSelectAPIDropdown] = useState<JSX.Element[]>([]);

    const init = async() => {
        let response;

        try {
            response = await AccountRequest.info(cookies.token, import.meta.env.VITE_SERVICE_API_ID);
        } catch (e) {
            // alert( ((e as AxiosError).response as any).error );
            window.location.href = `/login?api=${import.meta.env.VITE_SERVICE_API_ID}`;
            return;
        }

        if(response == undefined) {
            window.location.href = `/login?api=${import.meta.env.VITE_SERVICE_API_ID}`;
            return;
        }

        setAccount(response?.response as FilteredAccount);

        let ownedAPIsHTML_ns: JSX.Element[] = []; //the non-state version, so i can update the state once and not
        let selectAPIDropdownHTML_ns: JSX.Element[] = []; //the non-state version, so i can update the state once and not
                //spam react
        
        for(let i: number = 0; i<response.response.ownedAPIs.length; i++ ) {
            let apiid = response.response.ownedAPIs[i];
            let apiResponse: API = {} as API;

            try {
                apiResponse = (await APIRequest.getAPI(apiid)).response;
            } catch (e) {}

            ownedAPIsHTML_ns.push(
            <>
            <div className="sidebyside" key={i}>
                <div style={{marginRight: "10px", width: "min-content"}}> 
                    Name: <br />
                    ID: <br />
                    Return Address: <br />
                </div>
                <div >
                    {apiResponse.name} <br />
                    {apiResponse._id.toString()} <br />
                    {apiResponse.returnAddress} <br />
                </div><br />
            </div>
            <button onClick={() => {generateAPIKey(apiResponse._id.toString())}}>Generate API Key</button>
            </>)

            selectAPIDropdownHTML_ns.push(
                <option value={i}>{apiResponse.name}</option>
            )
        }
        setSelectAPIDropdown(selectAPIDropdownHTML_ns);
        setOwnedAPIsHTML(ownedAPIsHTML_ns);
    }


    useEffect(() => {
        init();
    }, [])

    return (
    <div className="container">
        <div className="infobox">

            <div className="title">Account</div> <br />
            
            
            <div className="sidebyside">
                <div style={{margin: "10px"}}> 
                    Name:<br />
                    ID:<br />
                    Email:<br />
                    Created At: 
                </div>

                <div style={{margin: "10px"}}> 
                    {account?.name}<br/>
                    {account?._id.toString()}<br/>
                    {account?.email}<br/>
                    {account?.createdAt}<br/>
                </div>
            </div>




        </div>
        <br />
        <div className="infobox">
            <div className="title">Owned APIs</div> 
            <div className="rightAlign">
                <button style={{float: "right"}} onClick={() => {window.location.href = "/CreateAPI"}}>Create</button>
                <select style={{float: "right"}} onChange={(e) => {setSelectedAPI(e.target.value as unknown as number)}}>
                    {selectAPIDropdown}
                </select>
            </div>
            <br />
            {ownedAPIsHTML[selectedAPI]}
        </div>
    </div>);
};