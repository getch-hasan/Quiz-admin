import {privateRequest, publicRequest} from '../config/axios.config'

export const login = async (data) => {
    return await publicRequest.post(`login`, data);
};

/* list of resource */
export const index = async () => {
    return await privateRequest.get('/user');
};