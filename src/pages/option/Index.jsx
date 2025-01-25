
import { useEffect, useState } from "react";
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
      {
        id: 3,
        question: "Who wrote 'Hamlet'?",
        options: [
          { name: "William Shakespeare", is_correct: true },
          { name: "Charles Dickens", is_correct: false },
          { name: "Mark Twain", is_correct: false },
          { name: "Jane Austen", is_correct: false },
        ],
      },
      {
        id: 4,
        question: "What is the largest planet in our solar system?",
        options: [
          { name: "Earth", is_correct: false },
          { name: "Jupiter", is_correct: true },
          { name: "Mars", is_correct: false },
          { name: "Saturn", is_correct: false },
        ],
      },
      {
        id: 5,
        question: "What is the boiling point of water?",
        options: [
          { name: "100°C", is_correct: true },
          { name: "90°C", is_correct: false },
          { name: "120°C", is_correct: false },
          { name: "80°C", is_correct: false },
        ],
      },
      {
        id: 6,
        question: "What is the square root of 64?",
        options: [
          { name: "6", is_correct: false },
          { name: "8", is_correct: true },
          { name: "10", is_correct: false },
          { name: "12", is_correct: false },
        ],
      },
      {
        id: 7,
        question: "Who painted the Mona Lisa?",
        options: [
          { name: "Leonardo da Vinci", is_correct: true },
          { name: "Vincent van Gogh", is_correct: false },
          { name: "Claude Monet", is_correct: false },
          { name: "Pablo Picasso", is_correct: false },
        ],
      },
      {
        id: 8,
        question: "What is the smallest prime number?",
        options: [
          { name: "1", is_correct: false },
          { name: "2", is_correct: true },
          { name: "3", is_correct: false },
          { name: "5", is_correct: false },
        ],
      },
      {
        id: 9,
        question: "What is the chemical symbol for water?",
        options: [
          { name: "H2O", is_correct: true },
          { name: "CO2", is_correct: false },
          { name: "O2", is_correct: false },
          { name: "HO", is_correct: false },
        ],
      },
      {
        id: 10,
        question: "Which planet is known as the Red Planet?",
        options: [
          { name: "Venus", is_correct: false },
          { name: "Mars", is_correct: true },
          { name: "Mercury", is_correct: false },
          { name: "Jupiter", is_correct: false },
        ],
      },
      {
        id: 11,
        question: "What is the capital of Japan?",
        options: [
          { name: "Beijing", is_correct: false },
          { name: "Tokyo", is_correct: true },
          { name: "Seoul", is_correct: false },
          { name: "Bangkok", is_correct: false },
        ],
      },
      {
        id: 12,
        question: "What is 5 x 6?",
        options: [
          { name: "30", is_correct: true },
          { name: "25", is_correct: false },
          { name: "36", is_correct: false },
          { name: "20", is_correct: false },
        ],
      },
      {
        id: 13,
        question: "What is the capital of Italy?",
        options: [
          { name: "Rome", is_correct: true },
          { name: "Paris", is_correct: false },
          { name: "Berlin", is_correct: false },
          { name: "Madrid", is_correct: false },
        ],
      },
      {
        id: 14,
        question: "What is the largest mammal?",
        options: [
          { name: "Elephant", is_correct: false },
          { name: "Blue Whale", is_correct: true },
          { name: "Giraffe", is_correct: false },
          { name: "Polar Bear", is_correct: false },
        ],
      },
      {
        id: 15,
        question: "What is the main ingredient in guacamole?",
        options: [
          { name: "Avocado", is_correct: true },
          { name: "Tomato", is_correct: false },
          { name: "Onion", is_correct: false },
          { name: "Garlic", is_correct: false },
        ],
      },
      {
        id: 16,
        question: "What is the chemical symbol for gold?",
        options: [
          { name: "Au", is_correct: true },
          { name: "Ag", is_correct: false },
          { name: "Fe", is_correct: false },
          { name: "Pb", is_correct: false },
        ],
      },
      {
        id: 17,
        question: "What is the tallest mountain in the world?",
        options: [
          { name: "Mount Everest", is_correct: true },
          { name: "K2", is_correct: false },
          { name: "Kangchenjunga", is_correct: false },
          { name: "Lhotse", is_correct: false },
        ],
      },
      {
        id: 18,
        question: "Which ocean is the largest?",
        options: [
          { name: "Atlantic Ocean", is_correct: false },
          { name: "Pacific Ocean", is_correct: true },
          { name: "Indian Ocean", is_correct: false },
          { name: "Arctic Ocean", is_correct: false },
        ],
      },
      {
        id: 19,
        question: "What is the freezing point of water?",
        options: [
          { name: "0°C", is_correct: true },
          { name: "-10°C", is_correct: false },
          { name: "10°C", is_correct: false },
          { name: "32°C", is_correct: false },
        ],
      },
      {
        id: 20,
        question: "What is the fastest land animal?",
        options: [
          { name: "Cheetah", is_correct: true },
          { name: "Lion", is_correct: false },
          { name: "Tiger", is_correct: false },
          { name: "Leopard", is_correct: false },
        ],
      },
      // Add more questions as needed
    ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true); // Start loading
    const timeout = setTimeout(() => {
      setFilteredQuestions(
        questions.filter((question) =>
          question.question.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setLoading(false); // Stop loading
    }, 1000);

    return () => clearTimeout(timeout); // Clear timeout on cleanup
  }, [searchQuery, questions]);

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

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages + 1) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }

      return pages;
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
          className="border w-full border-gray-300 focus:border-blue-400 focus:border-[3px] p-2 rounded outline-none h-[38px]"
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
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : currentQuestions.length > 0 ? (
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
            Showing {startIndex + 1}-{" "}
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
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={index}
                  className="px-4 py-2 border border-r-[#6c757d]"
                >
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  className={`px-4 py-2 border border-r-[#6c757d] ${
                    currentPage === page
                      ? "bg-[#6c757d] text-white"
                      : "hover:bg-[#6c757d]"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            )}
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

