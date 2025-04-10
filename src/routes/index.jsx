import { DashboardLayout } from "../layouts/dashboard.layout";
import { CategoryList } from "../pages/category";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateCategory from "../pages/category/CreateCategory";
import EditCategory from "../pages/category/EditCategory";
import ExamList from "../pages/exam/index"
import CreateExam from "../pages/exam/CreateExam"
import CreateExamExcel from "../pages/exam/CreateExamExcel";
import EditExam from "../pages/exam/EditExam"
import { QuestionList } from "../pages/question/Index"
// import { CreateQuestion } from "../pages/question/CreateQuestion"
import { EditQuestion } from "../pages/question/EditQusetion"

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
      { path: "exam-list", element: <ExamList/> },
      { path: "create-exam", element: <CreateExam /> },
      { path: "edit-exam/:examId", element: <EditExam /> },
      { path: "create-excel-exam/:id", element: <CreateExamExcel /> },
    // /** question */
      { path: "question-list", element: <QuestionList /> },
      // { path: "create-question", element: <CreateQuestion /> },
      { path: "edit-question/:questionId", element: <EditQuestion /> },
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
