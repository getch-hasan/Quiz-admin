
import { Navigate } from "react-router-dom"
import { CategoryList } from '../pages/category/index'
import { DashboardLayout } from "../layouts/dashboard.layout"
import { Dashboard } from "../pages/Dashboard"
import CreateCategory from "../pages/category/CreateCategory"
import EditCategory from "../pages/category/EditCategory"
import { QuestionList } from "../pages/question/Index"
import { CreateQuestion } from "../pages/question/CreateQuestion"
import { EditQuestion } from "../pages/question/EditQusetion"
import { CreateOption } from "../pages/option/CreateOption"
import { OptionList } from "../pages/option/Index"
import { EditOption } from "../pages/option/EditOption"
import { UserList } from "../pages/User/Index"
import ExamList from "../pages/exam"
import CreateExam from "../pages/exam/CreateExam"
import EditExam from "../pages/exam/EditExam"
import { getToken } from "../utils/helper"
import Show from "../pages/User/Show"
import Testimonial from "../pages/testimonial"
import EditTestimonial from "../pages/testimonial/EditTestimonial"
import CreateTestimonial from "../pages/testimonial/CreateTestimonial"




const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      // dashboard
      { path: "", element: <Dashboard /> },
      /** category */
      { path: "category", element: <CategoryList /> },
      { path: "create-category", element: <CreateCategory /> },
      { path: "edit-category/:categoryId", element: <EditCategory/> },
      // /** question */
      { path: "question-list", element: <QuestionList /> },
      { path: "create-question", element: <CreateQuestion /> },
      { path: "edit-question/:questionId", element: <EditQuestion /> },
      // /** option */
      // { path: "option-list", element: <OptionList /> },
      // { path: "create-option", element: <CreateOption /> },
      // { path: "edit-option/:optionId", element: <EditOption /> },
      // /** User */
      { path: "user-list", element: <UserList /> },
      { path: "user-show/:userId", element: <Show/> },
      // /** exam */
      { path: "exam-list", element: <ExamList /> },
      { path: "create-exam", element: <CreateExam/> },
      { path: "edit-exam/:examId", element: <EditExam/> },
      // testimonial
      { path: "testimonial-list", element: <Testimonial/> },
      { path: "create-testimonial", element: <CreateTestimonial/> },
      { path: "edit-testimonial/:id", element: <EditTestimonial/> },
    ],
  },
]; 

/* Generate permitted routes */
export const permittedRoutes = () => {
    const token = getToken();
    if (token) {
        return appRoutes;
    } 
    return  [];
    
};