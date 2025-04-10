import { DashboardLayout } from "../layouts/dashboard.layout";
import { CategoryList } from "../pages/category";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateCategory from "../pages/category/CreateCategory"
import EditCategory from "../pages/category/EditCategory"

// import { getToken } from "../utils/helpers";





 
const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
     children:[

      { index:true, element:  <Dashboard></Dashboard> },
            /** category */
            { path: "category", element: <CategoryList /> },
            { path: "create-category", element: <CreateCategory /> },
            { path: "edit-category/:categoryId", element: <EditCategory/> },
   
       
     ]
  },
];

/* Generate permitted routes */
export const permittedRoutes = () => {
  // const token = getToken();

  // if (token) {
    return appRoutes;
  // }

  // return [];
};