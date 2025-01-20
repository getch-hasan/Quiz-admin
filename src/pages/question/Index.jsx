import { Link } from "react-router-dom";
import { FaEdit, FaList, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import Select from "react-select";
import { useState } from "react";

export const QuestionList = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      name: "What is the capital of Bangladesh?",
      category: "Geography",
      description: "This question tests knowledge about the capital of Bangladesh.",
      difficulty: "Easy",
      exam: "General Knowledge",
    },
    {
      id: 2,
      name: "Solve 2 + 2.",
      category: "Math",
      description: "Basic arithmetic question.",
      difficulty: "Hard",
      exam: "Math Basics",
    },
    {
      id: 3,
      name: "Who wrote 'Hamlet'?",
      category: "Literature",
      description: "This question tests knowledge about famous authors.",
      difficulty: "Medium",
      exam: "English Literature",
    },
    // Add more questions as needed
  ]);

  const [searchName, setSearchName] = useState(null);
  const [searchCategory, setSearchCategory] = useState(null);
  const [searchExam, setSearchExam] = useState(null);
  const [searchDifficulty, setSearchDifficulty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const propsData = {
    pageTitle: "Question List",
    pageIcon: <FaList />,
    buttonName: "Create New Question",
    buttonUrl: "/dashboard/question/create",
    type: "add",
  };

  /** Function to get difficulty color */
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-200 text-green-800";
      case "Medium":
        return "bg-yellow-200 text-yellow-800";
      case "Hard":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // Filter options for Select inputs
  const nameOptions = questions.map((q) => ({ value: q.name, label: q.name }));
  const categoryOptions = [...new Set(questions.map((q) => q.category))].map((c) => ({
    value: c,
    label: c,
  }));
  const examOptions = [...new Set(questions.map((q) => q.exam))].map((e) => ({
    value: e,
    label: e,
  }));
  const difficultyOptions = [...new Set(questions.map((q) => q.difficulty))].map((d) => ({
    value: d,
    label: d,
  }));

  // Filter questions based on search criteria
  const filteredQuestions = questions.filter((question) => {
    return (
      (!searchName || question.name === searchName.value) &&
      (!searchCategory || question.category === searchCategory.value) &&
      (!searchExam || question.exam === searchExam.value) &&
      (!searchDifficulty || question.difficulty === searchDifficulty.value)
    );
  });

  // Pagination logic
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

  return (
    <>
      <PageHeader propsData={propsData} />
      {/* Search Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          placeholder="Search by Name"
          options={nameOptions}
          value={searchName}
          onChange={(selectedOption) => {
            setSearchName(selectedOption);
            setCurrentPage(1); // Reset pagination
          }}
          isClearable
        />
        <Select
          placeholder="Search by Category"
          options={categoryOptions}
          value={searchCategory}
          onChange={(selectedOption) => {
            setSearchCategory(selectedOption);
            setCurrentPage(1); // Reset pagination
          }}
          isClearable
        />
        <Select
          placeholder="Search by Exam"
          options={examOptions}
          value={searchExam}
          onChange={(selectedOption) => {
            setSearchExam(selectedOption);
            setCurrentPage(1); // Reset pagination
          }}
          isClearable
        />
        <Select
          placeholder="Search by Difficulty"
          options={difficultyOptions}
          value={searchDifficulty}
          onChange={(selectedOption) => {
            setSearchDifficulty(selectedOption);
            setCurrentPage(1); // Reset pagination
          }}
          isClearable
        />
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead>
            <tr>
              <th>Question Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Exam Name</th>
              <th>Difficulty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedQuestions.map((question) => (
              <tr key={question.id}>
                <td>{question.name}</td>
                <td>{question.category}</td>
                <td>{question.description}</td>
                <td>{question.exam}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                      question.difficulty
                    )}`}
                  >
                    {question.difficulty}
                  </span>
                </td>
                <td>
                  <div className="flex gap-1">
                    <Link to={`/dashboard/edit-question/${question.id}`}>
                      <FaEdit className="text-primary text-xl" />
                    </Link>
                    <MdDelete
                      className="text-red-500 text-xl cursor-pointer"
                      onClick={() => (question.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
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
            >
              <FaArrowLeft />
            </button>
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                className={`px-4 py-2 border ${
                  currentPage === pageIndex + 1 ? "bg-[#6c757d] text-white" : "hover:bg-[#6c757d]"
                }`}
                onClick={() => handlePageChange(pageIndex + 1)}
              >
                {pageIndex + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 border hover:bg-[#6c757d]"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <FaArrowRight />
            </button>
          </span>
        </div>
      </div>
    </>
  );
};
