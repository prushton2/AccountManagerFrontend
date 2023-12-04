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
    singup: async(username: string, password: string, email: string): Promise<{response: string, error: string}> => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/account/new`;
        const body = {name: username, email: email, password: password};
        const response = await axios.post(url, body);
        return response.data;
    },
    info: async(token: string, apiid: string): Promise<{response: {_id: string, name: string, email: string, createdAt: number}, error: string}> => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/account/info?api=${apiid}`;
        const body = {token: token};
        const response = await axios.post(url, body);
        return response.data;
    }
}