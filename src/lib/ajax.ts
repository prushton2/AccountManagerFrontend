import axios from "axios";
import { API } from "../models/API";


export const APIRequest = {
    getAPI: async(apiid: string): Promise<{response: API, error: string}> => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/info?apiid=${apiid}`;
        const response = await axios.get(url);
        return response.data; 
    },
}


export const AccountRequest = {
    login: async(username: string, password: string, apiid: string): Promise<{response: {token: string, redirectTo: string}, error: string}> => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/account/login?api=${apiid}`;
        const body = {name: username, password: password};
        const response = await axios.post(url, body);
        return response.data;
    },
}