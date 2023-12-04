import { useEffect, useState } from "react"
import { FilteredAccount } from "../models/FilteredAcount"
import { APIRequest, AccountRequest } from "../lib/ajax";
import { useCookies } from "react-cookie";


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
            
            ownedAPIsHTML_ns.push(<div key={i}>
                {apiResponse?.response._id.toString()} <br />
                {apiResponse?.response.name} <br />
                {apiResponse?.response.returnAddress} <br />
            </div>)
        }
        setOwnedAPIsHTML(ownedAPIsHTML_ns);
    }


    useEffect(() => {
        init();
    }, [])

    return <>
        <div>
            <b>Account</b><br /><br />
            {account?._id.toString()}<br/>
            {account?.name}<br/>
            {account?.email}<br/>
            {account?.createdAt}<br/>
        </div>
        <br />
        <div>
            <b>Owned APIs</b> <br />
            {ownedAPIsHTML}
        </div>
    </>

};