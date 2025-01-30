
import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { useNavigate } from "react-router-dom";


const CreateExam = () => {
   const [categories, setCategories] = useState([]);
   const [loading,setLoading]=useState(false)

   console.log("categories", categories);
   const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });

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
  

  const onFormSubmit = async (data) => {
    console.log("data", data);

    try {
      setLoading(true)

          const formData = new FormData();
          formData.append("category_id", data.category_id);
          formData.append("exam_name", data.exam_name);
          formData.append("total_marks", data.total_marks);
          formData.append("total_questions", data.total_questions);
          formData.append("duration", data.duration);
          formData.append("status", data.status); // Checkbox value (0 or 1)

          
          if (data.thumbnail && data.thumbnail[0]) {
            formData.append("thumbnail", data.thumbnail[0]); 
          }
          console.log("objecttt", formData);
      const response = await NetworkServices.Exam.store(formData);
      
      if (response && response.status === 200) {
        navigate("/dashboard/exam-list");
        return Toastify.Success("Category Created.");
      }
    } catch (error) {
      
      console.log("error", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };
  const propsData = {
    pageTitle: " Create Exam ",
    pageIcon: <IoMdCreate />,
    buttonName: "Exam List",
    buttonUrl: "/dashboard/exam-list",
    type: "add", // This indicates the page type for the button
  };
  return (
    <>
      <PageHeader propsData={propsData} />
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="p-4 shadow-md rounded-md bg-white"
      >
        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-600 font-medium">
            Category
          </label>
          <select
            id="category"
            {...register("category_id")}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category_id.message}
            </p>
          )}
        </div>

        {/* Exam Name */}
        <div className="mb-4">
          <label
            htmlFor="exam_name"
            className="block text-gray-600 font-medium"
          >
            Exam Name
          </label>
          <input
            type="text"
            id="exam_name"
            {...register("exam_name", { required: "Exam name is required" })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter exam name"
          />
          {errors.exam_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.exam_name.message}
            </p>
          )}
        </div>

        {/* Grid Layout for Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Total Marks */}
          <div>
            <label
              htmlFor="total_marks"
              className="block text-gray-600 font-medium"
            >
              Total Marks
            </label>
            <input
              type="number"
              id="total_marks"
              {...register("total_marks", {
                required: "Total marks is required",
              })}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter total marks"
            />
            {errors.total_marks && (
              <p className="text-red-500 text-sm mt-1">
                {errors.total_marks.message}
              </p>
            )}
          </div>

          {/* Total Questions */}
          <div>
            <label
              htmlFor="total_questions"
              className="block text-gray-600 font-medium"
            >
              Total Questions
            </label>
            <input
              type="number"
              id="total_questions"
              {...register("total_questions", {
                required: "Total questions are required",
              })}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter total questions"
            />
            {errors.total_questions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.total_questions.message}
              </p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="block text-gray-600 font-medium"
            >
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              {...register("duration", { required: "Duration is required" })}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter exam duration in minutes"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-gray-600 font-medium"
            >
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              {...register("thumbnail")}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.thumbnail.message}
              </p>
            )}
          </div>
        </div>

        {/* Status (Checkbox) */}
        <div className="mt-4">
          {/* <label className="flex items-center"> */}
            <input
              type="checkbox"
              id="status"
              {...register("status")}
              className="mr-2"
              value="1"
              checked={watch("status") === 1}
              onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
            />
            <span className="text-gray-600 font-medium">Status</span>
          {/* </label> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-4 px-4 py-2 text-white rounded-md transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Create Exam"}
        </button>
      </form>
    </>
  );
};

export default CreateExam;
