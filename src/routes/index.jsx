import { getToken } from "../utils/helper"
import { Product } from "../pages/product"
import { Navigate } from "react-router-dom"
// import { Dashboard } from '../components/dashboard'
import { CategoryList } from '../pages/category/index'
import { DashboardLayout } from "../layouts/dashboard.layout"
import { Dashboard } from "../pages/Dashboard"
import ProductList from "../pages/product/ProductList/ProductList"
import AddProduct from "../pages/product/AddProduct/AddProduct"
import CreateCategory from "../pages/category/CreateCategory"
import EditCategory from "../pages/category/EditCategory"

const appRoutes = [
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            { path: "*", element: <Navigate to="/404" /> },
            // dashboard
            {path:"",element:<Dashboard/>},
                     
            /** category */
            { path:"category", element: <CategoryList /> },
            { path:"create-category", element: <CreateCategory/> },
            { path:"edit-category/:id", element: <EditCategory/> },

            // /** product */
            // { path: "product", element:  <Product /> },
            // { path: "product/category", element:  <Product /> },
            // { path: "product/product-list", element:  <ProductList/>},
            // { path: "product/add-product", element:  <AddProduct/>},
         

         
       
        ],
    },
]; 

/* Generate permitted routes */
export const permittedRoutes = () => {
    // const token = getToken();
    // if (token) {
    //     return appRoutes;
    // }
    return appRoutes;
    return [];
};