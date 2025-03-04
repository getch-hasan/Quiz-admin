import { privateRequest } from "../config/axios.config";

/* list of resource */
export const index = async ( examId ) => {

  if (examId){
    return await privateRequest.get(`/admin/question?exam_id=${examId}`);
  }
  else{
    return await privateRequest.get(`/admin/question`);
  }
};
/* resource store */
export const store = async (data) => {
  return await privateRequest.post("/admin/question", data);
};
/* resource show */
export const show = async (id) => {
  return await privateRequest.get(`/admin/question/${id}`);
};
/* reosurce update */
export const update = async (id,data) => {
  return await privateRequest.post(`/admin/question/${id}`, data);
};
/* resource destory */
export const destroy = async (id) => {
  return await privateRequest.delete(`/admin/question/${id}`);
};
