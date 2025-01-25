import { Toastify } from "../components/toastify";


export const getToken = () => {
    return localStorage.getItem("token");
}

/* set token */
export const setToken = (token) => {
    return localStorage.setItem("token", token);
}

/* remove token */
export const removeToken = () => {
    return localStorage.removeItem("token");
};

/* Global network error handeller */
export const networkErrorHandeller = (error) => {

    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errors
    ) {
    return Toastify.Error(error.response.data.errors[0]);
    } else {
        return Toastify.Error("Something going wrong, Try again.");
    }
};