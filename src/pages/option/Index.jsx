import { useState } from "react";
import { FaEdit, FaList, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { Link } from "react-router-dom";

export const OptionList = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      options: [
        { name: "Paris", is_correct: true },
        { name: "London", is_correct: false },
        { name: "Berlin", is_correct: false },
        { name: "Madrid", is_correct: false },
      ],
    },
    {
      id: 2,
      question: "What is 2 + 2?",
      options: [
        { name: "3", is_correct: false },
        { name: "4", is_correct: true },
        { name: "5", is_correct: false },
        { name: "6", is_correct: false },
      ],
    },
    // Add more questions as needed
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  // Filtered questions based on search input
  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setQuestions(questions.filter((question) => question.id !== id));
    }
  };

  const propsData = {
    pageTitle: "Option List",
    pageIcon: <FaList />,
    buttonName: "Create New Question",
    buttonUrl: "/dashboard/create-option",
    type: "add",
  };

  return (
    <>
      <PageHeader propsData={propsData} />
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by question name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border w-full border-gray-300 focus:border-blue-400  focus:border-[3px] p-2 rounded outline-none h-[38px]"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead>
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Correct Option</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.length > 0 ? (
              currentQuestions.map((question) => (
                <tr key={question.id}>
                  <td>{question.question}</td>
                  <td>
                    <ul>
                      {question.options.map((option, index) => (
                        <li key={index}>{option.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {question.options
                      .filter((option) => option.is_correct)
                      .map((correctOption) => correctOption.name)
                      .join(", ")}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link to={`/dashboard/edit-option/${question.id}`}>
                        <FaEdit className="text-primary text-xl" />
                      </Link>
                      <Link onClick={() => confirmDelete(question.id)}>
                        <MdDelete className="text-red-500 text-xl" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No questions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between mt-5">
        <div>
          <p className="mb-2">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredQuestions.length)} of {filteredQuestions.length}
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
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                className={`px-4 py-2 border border-r-[#6c757d] ${
                  currentPage === pageIndex + 1 ? "bg-[#6c757d] text-white" : "hover:bg-[#6c757d]"
                }`}
                onClick={() => handlePageChange(pageIndex + 1)}
              >
                {pageIndex + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 border border-r-[#6c757d] hover:bg-[#6c757d]"
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
