// api/auth.js
import axios from "axios";
import { baseURL } from "../app";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export async function getLocalStorageData() {

    let data = await AsyncStorage.getItem('@auth');
    const userData = JSON.parse(data);  
    
    return userData;
}