import { DashboardLayout } from "../layouts/dashboard.layout";
import { CategoryList } from "../pages/category";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateCategory from "../pages/category/CreateCategory";
import EditCategory from "../pages/category/EditCategory";
import ExamList from "../pages/exam/index";
import CreateExam from "../pages/exam/CreateExam";
import CreateExamExcel from "../pages/exam/CreateExamExcel";
import EditExam from "../pages/exam/EditExam";
import { QuestionList } from "../pages/question/Index";
// import { CreateQuestion } from "../pages/question/CreateQuestion"
import { EditQuestion } from "../pages/question/EditQusetion";
import Testimonial from "../pages/testimonial";
import CreateTestimonial from "../pages/testimonial/CreateTestimonial";
import EditTestimonial from "../pages/testimonial/EditTestimonial";
import { UserList } from "../pages/User/Index"
import Show from "../pages/User/Show";

// import { getToken } from "../utils/helpers";

const appRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard></Dashboard> },
      /** category */
      { path: "category", element: <CategoryList /> },
      { path: "create-category", element: <CreateCategory /> },
      { path: "edit-category/:categoryId", element: <EditCategory /> },
      // /** exam */
      { path: "exam-list", element: <ExamList /> },
      { path: "create-exam", element: <CreateExam /> },
      { path: "edit-exam/:examId", element: <EditExam /> },
      { path: "create-excel-exam/:id", element: <CreateExamExcel /> },
      // /** question */
      { path: "question-list", element: <QuestionList /> },
      // { path: "create-question", element: <CreateQuestion /> },
      { path: "edit-question/:questionId", element: <EditQuestion /> },
      // testimonial
      { path: "testimonial-list", element: <Testimonial /> },
      { path: "create-testimonial", element: <CreateTestimonial /> },
      { path: "edit-testimonial/:id", element: <EditTestimonial /> },
      // /** User */
      { path: "user-list", element: <UserList /> },
      { path: "user-show/:userId", element: <Show/> },
    ],
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
