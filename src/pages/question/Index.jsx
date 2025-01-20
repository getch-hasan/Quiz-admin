import { Link } from "react-router-dom";
import { FaEdit, FaList } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PageHeader } from "../../components/PageHeading/PageHeading";
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
  ]);

  /** Delete a question */
  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setQuestions(questions.filter((question) => question.id !== id));
    }
  };

  const propsData = {
    pageTitle: "Question List",
    pageIcon: <FaList />,
    buttonName: "Create New Question",
    buttonUrl: "/dashboard/question/create",
    type: "add", // This indicates the page type for the button
  };

  /** Function to get difficulty color */
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-200 text-green-800"; // Green for Easy
      case "Medium":
        return "bg-yellow-200 text-yellow-800"; // Yellow for Medium
      case "Hard":
        return "bg-red-200 text-red-800"; // Red for Hard
      default:
        return "bg-gray-200 text-gray-800"; // Default color
    }
  };

  return (
    <>
      <PageHeader propsData={propsData} />
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Question Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Exam Name</th> 
              <th>Difficulty</th>             
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through questions */}
            {questions.map((question) => (
              <tr key={question.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>{question.name}</td>
                <td>{question.category}</td>
                <td>{question.description}</td>
                <td>{question.exam}</td> {/* Display Exam Name */}
                <td>
                  {/* Difficulty with dynamic color */}
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
                    {/* Edit Button */}
                    <Link to={`/dashboard/edit-question/${question.id}`}>
                      <FaEdit className="text-primary text-xl" />
                    </Link>

                    {/* Delete Button */}
                    <MdDelete
                      className="text-red-500 text-xl cursor-pointer"
                      onClick={() => confirmDelete(question.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

