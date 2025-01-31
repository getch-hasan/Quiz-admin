import { Toastify } from "../components/toastify";
import Cookies from 'js-cookie';
export const getToken = () => {
    if (typeof window !== "undefined") {
        console.log(Cookies.get('token'))
        return Cookies.get('token'); // Retrieve token from cookie
        
      }
}

/* set token */
export const setToken = (token) => {
    Cookies.set('token', token, { expires: 7, path: '/' }); // Set token with expiration (7 days) and path
    return true;
}

/* remove token */
export const removeToken = () => {
    return  Cookies.remove('token');
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

// response check for return true false 
export const responseChecker = (response,status_code=200) => {
    if ((response && response.status == status_code) || response.status == 201) {
      return true;
    } else {
      return false;
    }
  };