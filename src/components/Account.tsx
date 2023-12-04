import { useEffect, useState } from "react"
import { FilteredAccount } from "../models/FilteredAcount"
import { APIRequest, AccountRequest } from "../lib/ajax";
import { useCookies } from "react-cookie";
import "./Account.css"

export default function AccountPage() {

    const [account, setAccount] = useState<FilteredAccount>();
    const [cookies] = useCookies(["token"]);
    const [ownedAPIsHTML, setOwnedAPIsHTML] = useState<JSX.Element[]>([]);

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
                //spam react
        
        for(let i: number = 0; i<response.response.ownedAPIs.length; i++ ) {
            let apiid = response.response.ownedAPIs[i];
            let apiResponse;

            try {
                apiResponse = await APIRequest.getAPI(apiid);
            } catch (e) {}
            
            ownedAPIsHTML_ns.push(
            
            <div className="sidebyside" key={i}>
                <div style={{marginRight: "10px", width: "min-content"}}> 
                    Name: <br />
                    ID: <br />
                    Return Address: <br />
                </div>
                <div > 
                    {apiResponse?.response.name} <br />
                    {apiResponse?.response._id.toString()} <br />
                    {apiResponse?.response.returnAddress} <br />
                </div>
            </div>)
        }
        setOwnedAPIsHTML(ownedAPIsHTML_ns);
    }


    useEffect(() => {
        init();
    }, [])

    return (
    <div className="container">
        <div className="loginWindow">
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
        <div className="loginWindow">
            <div className="title">Owned APIs</div> <br />
            {ownedAPIsHTML}
        </div>
    </div>);
};