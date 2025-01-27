
import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { useNavigate, useParams } from "react-router-dom";

const EditExam = () => {
  const [categories, setCategories] = useState([]);
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(false);
   const { examId } = useParams();

  console.log("categories", categories);
  console.log("questionId", examId);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  // Fetch the category details from the API and populate the form
  const fetchExam = async (examId) => {
    try {
      const response = await NetworkServices.Exam.show(examId);
      console.log("responserrrr", response);
      if (response && response.status === 200) {
        const exam = response?.data?.data;
        setExam(exam);

        setValue("category_id", exam.category_id);
        setValue("exam_name", exam.exam_name);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    if (examId) {
      fetchExam(examId);
    }
  }, [examId, setValue]);

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
      setLoading(true);
      const response = await NetworkServices.Exam.store(data);
      console.log("objecttt", response);
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
          {errors.parent_category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.parent_category.message}
            </p>
          )}
        </div>

        {/* Category Name */}
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-gray-600 font-medium"
          >
            Exam Name
          </label>
          <input
            type="text"
            id="exam_name"
            {...register("exam_name", {
              required: "Category name is required",
            })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter category name"
          />
          {errors.category_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.exam_name.message}
            </p>
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
          {loading ? "Loading..." : "Create Exam"}
        </button>
      </form>
    </>
  );
};

export default EditExam;
