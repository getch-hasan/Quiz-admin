import { privateRequest } from "../config/axios.config";

/* list of resource */
export const index = async () => {
    return await privateRequest.get('admin/dashboard');
};