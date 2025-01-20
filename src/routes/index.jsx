
import { Navigate } from "react-router-dom"
import { CategoryList } from '../pages/category/index'
import { DashboardLayout } from "../layouts/dashboard.layout"
import { Dashboard } from "../pages/Dashboard"
import CreateCategory from "../pages/category/CreateCategory"
import EditCategory from "../pages/category/EditCategory"
import { QuestionList } from "../pages/question/Index"
import { CreateQuestion } from "../pages/question/CreateQuestion"
import { EditQuestion } from "../pages/question/EditQusetion"



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

            // /** question */
            { path:"question-list", element: <QuestionList/> },
            { path:"create-question", element: <CreateQuestion/> },
            { path:"edit-question/:id", element: <EditQuestion/> },
         

         
       
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