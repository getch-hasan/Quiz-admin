import React, { useEffect } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { MdBrowserUpdated } from "react-icons/md";

const EditCategory = () => {
  const { id } = useParams(); // Get the category ID from the route
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Mock function to fetch category details
  const fetchCategory = async (categoryId) => {
    // Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: categoryId, categoryName: "Example Category" });
      }, 500);
    });
  };

  useEffect(() => {
    // Fetch category details and populate form
    const loadCategory = async () => {
      const category = await fetchCategory(id);
      setValue("categoryName", category.categoryName); // Set the value in the form
    };
    loadCategory();
  }, [id, setValue]);

  const onFormSubmit = (data) => {
    console.log("Updated Data:", data);
  };

  const propsData = {
    pageTitle: "Update Category",
    pageIcon: <MdBrowserUpdated />,
    buttonName: "Category List",
    buttonUrl: "/dashboard/category",
    type: "add",
  };

  return (
    <>
      <PageHeader propsData={propsData} />

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="p-4 shadow-md rounded-md bg-white"
      >
        {/* Category Name */}
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-gray-600 font-medium">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            {...register("categoryName", { required: "Category name is required" })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter category name"
          />
          {errors.categoryName && (
            <p className="text-red-500 text-sm mt-1">{errors.categoryName.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Update Category
        </button>
      </form>
    </>
  );
};

export default EditCategory;
