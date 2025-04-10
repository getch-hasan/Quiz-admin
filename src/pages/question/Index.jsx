import { Link } from "react-router-dom";
import { FaEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import { confirmAlert } from "react-confirm-alert";
import { Toastify } from "../../components/toastify";
import DataTable from "react-data-table-component";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import { SkeletonTable } from "../../components/loading/skeleton-table";
import { IoIosList } from "react-icons/io";
import { networkErrorHandeller } from "../../utils/helpers";

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  
  // Fetch question from API
  const fetchQuestion = useCallback(async () => {
    try {
      setLoading(true);
      const response = await NetworkServices.Question.index();

      if (response?.status === 200) {
        setQuestions(response?.data?.data || []);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  // Handle single category deletion
  const destroy = (id) => {
    console.log("object", id);
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await NetworkServices.Question.destroy(id);
              if (response?.status === 200) {
                Toastify.Info("Question deleted successfully.");
                fetchQuestion();
              }
            } catch (error) {
              networkErrorHandeller(error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const propsData = {
    pageTitle: "Question List",
    pageIcon: <IoIosList />,
    type: "add",
  };
  if(loading){
    return <div>
      <PageHeaderSkeleton/>
      <br/>
      <SkeletonTable/>
    </div>
  }
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-200 text-green-800";
      case "medium":
        return "bg-yellow-200 text-yellow-800";
      case "hard":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };
   
  const columns = [
    {
      name: "Question Name",
      cell: (row) => row.question,
    },
    {
      name: "Category Name",
      cell: (row) => row?.category?.category_name,
    },
    {
      name: "Description",
      cell: (row) => row.q_description,
    },

    {
      name: "Difficulty Level", 
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
            row.difficulty_level
          )}`}
        >
          {row.difficulty_level}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/edit-question/${row?.question_id}`}>
            <FaEdit className="text-primary text-xl" />
          </Link>
          <MdDelete
            className="text-red-500 text-xl cursor-pointer"
            onClick={() => destroy(row?.question_id)}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <PageHeader propsData={propsData} />
      <DataTable columns={columns} data={questions} pagination  
		 />
    </>
  );
};
