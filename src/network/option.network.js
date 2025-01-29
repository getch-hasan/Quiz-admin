import { privateRequest } from "../config/axios.config";

/* list of resource */
export const index = async () => {
  return await privateRequest.get("/admin/option");
};



/* resource store */
export const store = async (data) => {
  console.log("object", data);
  return await privateRequest.post("/admin/option", data);
};

/* resource show */
export const show = async (id) => {
  return await privateRequest.get(`/admin/option/${id}`);
};

/* reosurce update */
export const update = async (id, data) => {
  return await privateRequest.post(`admin/option/${id}`, data);
};

/* resource destory */
export const destroy = async (id) => {
  return await privateRequest.delete(`/admin/option/${id}`);
};

// /* resource destory */
// export const bulkDestroy = async (ids) => {
//   return await privateRequest.post(`/admin/bulk-destroy-category`, ids);
// };
