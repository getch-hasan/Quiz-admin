import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoIosCreate } from "react-icons/io";
import { useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import { useCallback } from "react";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import { Toastify } from "../../components/toastify";

export const EditQuestion = () => {
  const [categories] = useState(["Math", "Science", "History", "Literature"]);
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [exam, setExam] = useState([]);

  const { questionId } = useParams();

  console.log("qdata", questionData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch categories from API
  const fetchCategoryParent = useCallback(async () => {
    try {
      const response = await NetworkServices.Category.index();

      if (responseChecker(response, 200)) {
        setParentCategories(response?.data?.data || []);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, []);

  useEffect(() => {
    fetchCategoryParent();
  }, [fetchCategoryParent]);
  // Fetch exam from API
  const fetchExam = useCallback(async () => {
    try {
      const response = await NetworkServices.Exam.index();

      if (responseChecker(response, 200)) {
        setExam(response?.data?.data || []);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, []);

  useEffect(() => {
    fetchExam();
  }, [fetchExam]);

  // Fetch the category details from the API and populate the form
  const fetchQuestion = useCallback(
    async (questionId) => {
      try {
        setLoading(true);
        const response = await NetworkServices.Question.show(questionId);
        console.log("responserrrr", response);
        if (response && response.status === 200) {
          const question = response?.data?.data;
          setQuestionData(question);

          // Correctly use the fetched data for setting the form values
          setValue("exam", question?.exam_id);
          setValue("name", question?.question);
          setValue("description", question?.q_description || "");
          setValue("category", question?.category_id);
          setValue("difficulty", question?.difficulty_level);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
      setLoading(false);
    },
    [setValue, setLoading]
  );

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

  const onSubmit = async (data) => {

    console.log("data",data);
    // update function for category
    const formData = new FormData();
    formData.append("exam_id", data.exam);
    formData.append("question", data.name);
    formData.append("q_description", data.description);
    formData.append("category_id", data.category);
    formData.append("difficulty_level", data.difficulty);
    formData.append("_method", "PUT");
    try {
      const response = await NetworkServices.Question.update(
        questionId,
        formData
      );

      console.log("update", response);
      if (response && response.status === 200) {
        navigate("/dashboard/question-list");
        return Toastify.Success("Category Updated.");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
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
          <select
            {...register("exam", { required: "Category is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Select a category</option>
            {exam.map((singleExam) => (
              <option key={singleExam.exam_id} value={singleExam.exam_id}>
                {singleExam.exam_name}
              </option>
            ))}
          </select>
          {errors.examName && (
            <p className="text-red-500 text-sm">{errors.examName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Question Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Question Name is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Select a category</option>
            {parentCategories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <select
            {...register("difficulty", { required: "Difficulty is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          {errors.difficulty && (
            <p className="text-red-500 text-sm">{errors.difficulty.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Update Question"}
        </button>
      </form>
    </>
  );
};
