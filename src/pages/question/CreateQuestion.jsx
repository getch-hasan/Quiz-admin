import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoIosCreate } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";

export const CreateQuestion = () => {
  const [categories,setCategories] = useState([]);
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log("cate", categories);

    const fetchCategory = useCallback(async () => {
      setLoading(true); // Start loading
      try {
        const response = await NetworkServices.Category.index();
        
        if (response && response.status === 200) {
          setCategories(response?.data?.data);
        }
      } catch (error) {
        console.error("Fetch Category Error:", error);
      }
      setLoading(false); // End loading (handled in both success and error)
    }, []);
    
      // category api fetch
      useEffect(() => {
        fetchCategory();
      }, [fetchCategory]);

  const onSubmit = async (data) => {
    console.log("Question Saved:", data);
     try {
       setLoading(true)
       const response = await NetworkServices.Question.store(data);
      //  console.log("objecttt", response);
       if (response && response.status === 200) {
         navigate("/dashboard/question-list");
         return Toastify.Success("Category Created.");
       }
     } catch (error) {
      
       console.log("error", error);
       networkErrorHandeller(error);
     }
      setLoading(false);
  };

  const propsData = {
    pageTitle: "Create New Question",
    pageIcon: <IoIosCreate />,
    buttonName: "Back to Questions",
    buttonUrl: "/dashboard/questions",
    type: "add",
  };

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
            {...register("question", { required: "Question Name is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            {...register("category_id", { required: "Category is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category?.category_id} value={category?.category_id}>
                {category?.category_name}
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
            {...register("q_description", {
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
            {...register("difficulty_level", { required: "Difficulty is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {errors.difficulty && (
            <p className="text-red-500 text-sm">{errors.difficulty.message}</p>
          )}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Create Question"}
        </button>
      </form>
    </>
  );
};
