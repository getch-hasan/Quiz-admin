import { Link } from "react-router-dom";
import { FaEdit, FaList, FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { NetworkServices } from "../../network";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import { confirmAlert } from "react-confirm-alert";
import { Toastify } from "../../components/toastify";

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState(null);
  const [searchExam, setSearchExam] = useState("");
  const [searchDifficulty, setSearchDifficulty] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [categories, setCategories] = useState([]);

  console.log("questions", debouncedSearchTerm);
  console.log("categories", categories);

  // Debounced search
  useEffect(() => {
    setLoading(true); // Start loading
    const handler = setTimeout(() => {
      setDebouncedSearchTerm({
        name: searchName,
        category: searchCategory,
        exam: searchExam,
        difficulty: searchDifficulty,
      });
      setLoading(false); // Stop loading
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchName, searchCategory, searchExam, searchDifficulty]);

  // Fetch question from API
  const fetchQuestion = useCallback(async () => {
    try {
      const response = await NetworkServices.Question.index();
      console.log("question", response);
      if (response?.status === 200) {
        setQuestions(response?.data?.data || []);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
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
                Toastify.Info("Category deleted successfully.");
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
    pageIcon: <FaList />,
    buttonName: "Create New Question",
    buttonUrl: "/dashboard/create-question",
    type: "add",
  };

  console.log("searchCategory", searchCategory);

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

  // const categoryOptions = [
  //   ...new Set(questions.map((question) => question.category)),
  // ].map((singleCategory) => ({
  //   value: singleCategory,
  //   label: singleCategory,
  // }));
  // const difficultyOptions = [
  //   ...new Set(questions.map((question) => question.difficulty_level)),
  // ].map((singleDifficulty) => ({
  //   value: singleDifficulty,
  //   label: singleDifficulty,
  // }));

    // Fetch categories from API
    const fetchCategory = useCallback(async () => {
      try {
        const response = await NetworkServices.Category.index();
        console.log(response);
        if (responseChecker(response, 200)) {
          setCategories(response?.data?.data || []);
        }
      } catch (error) {
        networkErrorHandeller(error);
      }
    }, []);
  
    useEffect(() => {
      fetchCategory();
    }, [fetchCategory]);

  // Filtered Questions
  const filteredQuestions = questions.filter((question) => {
    return (
      (!debouncedSearchTerm.name ||
        question.question
          .toLowerCase()
          .includes(debouncedSearchTerm.name.toLowerCase())) &&
      (!debouncedSearchTerm.category ||
        question.category.some(
          (cat) => cat.category_name === debouncedSearchTerm.category.value
        )) &&
      (!debouncedSearchTerm.exam ||
        question.exam
          .toLowerCase()
          .includes(debouncedSearchTerm.exam.toLowerCase())) &&
      (!debouncedSearchTerm.difficulty ||
        question.difficulty_level === debouncedSearchTerm.difficulty.value)
    );
  });

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  // pagination
  const handlePageNumbers = (currentPage, totalPages) => {
    let pages = [];

    if (totalPages <= 5) {
      // Show all pages if totalPages is 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first 5 pages, ellipsis, and the last page
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, 5, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return pages;
  };

  return (
    <>
      <PageHeader propsData={propsData} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          className="border border-gray-300 focus:border-blue-400  focus:border-[3px] p-2 rounded outline-none h-[38px]"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Select
          placeholder="Search by Category"
          options={categories.map((cat) => ({
            value: cat.category_name,
            label: cat.category_name,
          }))}
          value={searchCategory}
          onChange={(selectedOption) => {
            setSearchCategory(selectedOption);
            setCurrentPage(1);
          }}
          isClearable
          className="w-full"
        />

        {/* <input
          type="text"
          placeholder="Search by Exam"
          className="border border-gray-300 focus:border-blue-400  focus:border-[3px] p-2 rounded outline-none h-[38px]"
          value={searchExam}
          onChange={(e) => {
            setSearchExam(e.target.value);
            setCurrentPage(1);
          }}
        /> */}
        <Select
          placeholder="Search by Difficulty"
          options={[...new Set(questions.map((q) => q.difficulty_level))].map(
            (diff) => ({
              value: diff,
              label: diff,
            })
          )}
          value={searchDifficulty}
          onChange={(selectedOption) => {
            setSearchDifficulty(selectedOption);
            setCurrentPage(1);
          }}
          isClearable
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead>
            <tr>
              <th>Question Name</th>
              <th>Category</th>
              <th>Description</th>

              <th>Difficulty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Show loading spinner or text when loading
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paginatedQuestions.length > 0 ? (
              // Map over questions if they exist
              paginatedQuestions.map((question) => (
                <tr key={question.question_id}>
                  <td>{question.question}</td>
                  {question.category && question.category.length > 0
                    ? question.category.map((cat, index) => (
                        <span key={index} className="inline-block mr-2">
                          {cat?.category_name}
                        </span>
                      ))
                    : "No categories"}
                  <td>{question.q_description}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                        question.difficulty_level
                      )}`}
                    >
                      {question.difficulty_level}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <Link
                        to={`/dashboard/edit-question/${question?.question_id}`}
                      >
                        <FaEdit className="text-primary text-xl" />
                      </Link>
                      <MdDelete
                        className="text-red-500 text-xl cursor-pointer"
                        onClick={() => destroy(question?.question_id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Show "No questions found" when not loading and no questions
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No questions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <div className="flex items-center justify-between mt-5">
        <div>
          <p className="mb-2">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredQuestions.length)} of{" "}
            {filteredQuestions.length}
          </p>
        </div>
        <div>
          <span className="inline-flex border border-[#6c757d] rounded-sm overflow-hidden">
            <button
              className="px-4 py-2 border border-r-[#6c757d] hover:bg-[#6c757d]"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>

            {handlePageNumbers(currentPage, totalPages).map((page, index) => (
              <button
                key={index}
                className={`px-4 py-2 border ${
                  currentPage === page
                    ? "bg-[#6c757d] text-white"
                    : "hover:bg-[#6c757d]"
                } ${page === "..." ? "cursor-default" : ""}`}
                onClick={() => {
                  if (page !== "...") handlePageChange(page);
                }}
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}

            <button
              className="px-4 py-2 border hover:bg-[#6c757d]"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaArrowRight />
            </button>
          </span>
        </div>
      </div>
    </>
  );
};
