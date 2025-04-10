
import Cookies from 'js-cookie';
import { Toastify } from '../../components/toastify';
export const getToken = () => {
    if (typeof window !== "undefined") { 
        return Cookies.get('mocktest-token'); // Retrieve token from cookie
        
      }
}

/* set token */
export const setToken = (token) => {
    Cookies.set('mocktest-token', token, { expires: 7, path: '/' }); // Set token with expiration (7 days) and path
    return true;
}

/* remove token */
// export const removeToken = () => {
//     console.log("cl")
//     return  Cookies.remove('mocktest-token');
// };
export const removeToken = () => {
    console.log("cl");
    Cookies.remove("mocktest-token");
    Cookies.remove("mocktest-token", { path: "/" }); // In case it's set with a path
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