import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoIosCreate } from "react-icons/io";
import { useEffect, useState } from "react";
import { NetworkServices } from "../../network";

export const EditQuestion = () => {
  const [categories] = useState(["Math", "Science", "History", "Literature"]); 
  const [questionData, setQuestionData] = useState(null);
  
  const { questionId } = useParams();

  console.log("objectid", questionData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();



    // Fetch the category details from the API and populate the form
    const fetchQuestion = async (questionId) => {
      try {
        const response = await NetworkServices.Question.show(questionId);
        console.log("responserrrr", response);
        if (response && response.status === 200) {
          const category = response?.data?.data;
          setQuestionData(category);
          
          setValue("examName", questionData.question);
          setValue("name", questionData.question);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
  
    useEffect(() => {
      if (questionId) {
        fetchQuestion(questionId);
      }
    }, [questionId, setValue]);

  // useEffect(() => {
  //   // Fetch question data based on ID (simulate API call)
  //   const question = existingQuestions.find((q) => q.id === questionId);
  //   if (question) {
  //     setQuestionData(question);

  //     // Set initial values in the form
  //     Object.keys(question).forEach((key) => {
  //       setValue(key, question[key]);
  //     });
  //   }
  // }, [questionId, setValue]);

  const onSubmit = (data) => {
    console.log("Updated Question:", data);
    alert("Question Updated Successfully!");
    navigate("/dashboard/questions");
  };

  const propsData = {
    pageTitle: "Edit Question",
    pageIcon: <IoIosCreate />,
    buttonName: "Back to Questions",
    buttonUrl: "/dashboard/questions",
    type: "edit",
  };

  // if (!questionData) {
  //   return <div>Loading...</div>; // Loading state while data is fetched
  // }

  return (
    <>
      <PageHeader propsData={propsData} />
      <form
        className="mx-auto p-4 border border-gray-200 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Exam Name</label>
          <input
            type="text"
            {...register("examName", { required: "Exam Name is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          {errors.examName && <p className="text-red-500 text-sm">{errors.examName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Question Name</label>
          <input
            type="text"
            {...register("name", { required: "Question Name is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            rows="4"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <select
            {...register("difficulty", { required: "Difficulty is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {errors.difficulty && <p className="text-red-500 text-sm">{errors.difficulty.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Update Question
        </button>
      </form>
    </>
  );
};
