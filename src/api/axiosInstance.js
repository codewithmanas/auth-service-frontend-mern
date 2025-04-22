import axios from "axios";
import { getAccessToken } from "../utils/token.js";
import { BACKEND_BASE_URL } from "../constants.js";

const axiosInstance = axios.create({
    baseURL: BACKEND_BASE_URL || "http://localhost:8001",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true // this is needed if you want to send cookies with the request
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {

    // Skip auth if explicitly told
    if(config.skipAuth) {
        return config;
    }

    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);


// Response Interceptor
// Optional: Handle global errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
            // Example: Redirect to login on 401
            if (error.response?.status === 401) {
                console.warn("Unauthorized - sRedirecting to login");
                // You can dispatch logout, clear localStorage, etc.
            }

            return Promise.reject(error);
    }
);


export default axiosInstance;

