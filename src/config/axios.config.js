import axios from "axios";
import { getToken } from "../utils/helpers";


// const apiUrl =  process.env.REACT_APP_API_ENDPOINT;

const apiUrl = import.meta.env.VITE_API_ENDPOINT;


console.log(apiUrl)

/* Publica/Common request config */
axios.defaults.headers.post["Content-Type"] = "application/json";

const publicRequest = axios.create({
    baseURL: apiUrl,
});

const privateRequest = axios.create({
    baseURL: apiUrl,
}); 

/* Public request config */
publicRequest.interceptors.request.use(
    async (config) => {
        if (config.headers === undefined) {
            config.headers = {};
        }
        return config;
    },
    (err) => {
        console.log(err);
        Promise.reject(err);
    }
);

/* Private request config */
privateRequest.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (config.headers === undefined) {
            config.headers = {};
        }
        if (token) {
            config.headers["content-type"] = 'multipart/form-data';
            config.headers["Authorization"] = "Bearer " + token || "";
        }
        return config;
    },
    (err) => {
        console.log(err);
        Promise.reject(err);
    }
);

export { publicRequest, privateRequest };
