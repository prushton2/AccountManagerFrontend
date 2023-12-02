import axios from "axios";
import { apiResponse } from "../models/apiResponse";
import { API } from "../models/API";


export const APIRequest = {
    getAPI: async(apiid: string): Promise<{response: API, error: string}> => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/info?apiid=${apiid}`;
        const response = await axios.get(url);
        return response.data; 
    },
}


export const Account = {
    
}