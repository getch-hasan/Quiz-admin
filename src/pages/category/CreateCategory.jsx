import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";

const CreateCategory = () => {
   const [categories, setCategories] = useState([]);

   console.log("categories", categories);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

    const fetchCategory = useCallback(async () => {
      const response = await NetworkServices.Category.index();
      console.log("object", response);
      if (response && response.status === 200) {
        setCategories(response?.data?.data);
      }
    }, []);
  
    // category api fetch
    useEffect(() => {
      fetchCategory();
    }, [fetchCategory]);
  

  const onFormSubmit = async (data) => {
    console.log("data", data);

    try {
      // setLoading(true)
      const response = await NetworkServices.Category.store(data);
      console.log("objecttt", response);
      if (response && response.status === 200) {
        // navigate('/dashboard/category')
        return Toastify.Success("Category Created.");
      }
    } catch (error) {
      // setLoading(false)
      console.log("error", error);
      networkErrorHandeller(error);
    }
  };
  const propsData = {
    pageTitle: " Create Category ",
    pageIcon: <IoMdCreate />,
    buttonName: "Category List",
    buttonUrl: "/dashboard/task/create",
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
          <label
            htmlFor="parentCategory"
            className="block text-gray-600 font-medium"
          >
            Parent Category
          </label>
          <select
            id="parentCategory"
            {...register("parent_category", {
              required: "Parent category is required",
            })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home_appliances">Home Appliances</option>
            <option value="books">Books</option>
            <option value="others">Others</option>
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
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            {...register("category_name", {
              required: "Category name is required",
            })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter category name"
          />
          {errors.category_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category_name.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Create Category
        </button>
      </form>
    </>
  );
};

export default CreateCategory;
