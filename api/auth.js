// api/auth.js
import axios from "axios";
import { baseURL } from "../app";

export async function signupRequest(form) {
    try {
        const res = await axios.post(`${baseURL}/auth/signup`, form);
        return res.data; 
    } catch (error) {
        console.error("Error signing up:", error);
        console.log(error);
        throw error;  
    }
}
