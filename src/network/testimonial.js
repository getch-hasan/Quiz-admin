import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async ( ) => {
    return await privateRequest.get(`/admin/testimonial` );
};

/* resource store */
export const store = async(data) => {
    console.log("object",data);
    return await privateRequest.post('/admin/testimonial', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/testimonial/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`admin/testimonial/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/testimonial/${id}`)
}


