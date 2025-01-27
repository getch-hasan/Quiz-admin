import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { MdBrowserUpdated } from "react-icons/md";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helper";

const EditCategory = () => {
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const { categoryId } = useParams();

  // console.log("objectid", categoryId);
  console.log("object", categories);
  console.log("parent", parentCategories);

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
        
        if (response?.status === 200) {
          setParentCategories(response?.data?.data || []);
        }
      } catch (error) {
        networkErrorHandeller(error);
      }
    }, []);
  
    useEffect(() => {
      fetchCategoryParent();
    }, [fetchCategoryParent]);

  // Fetch the category details from the API and populate the form
  const fetchCategory = async (categoryId) => {
    try {
      const response = await NetworkServices.Category.show(categoryId);
      console.log("response", response.data.data);
      if (response && response.status === 200) {
        const category = response?.data?.data;
        setCategories([category]); // Assume categories is an array
        setValue("category_name", category.category_name);
        
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId); 
    }
  }, [categoryId, setValue]);

  const onFormSubmit = async (data) => {
    console.log("Updated Data:", data);
    try {
      const response = await NetworkServices.Category.update(categoryId, data);

      console.log("update", response);
      // if (response && response.status === 200) {
      //   // Redirect or show success message

      // }
    } catch (error) {
     networkErrorHandeller(error);
    }
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
        <div className="mb-4">
          <label
            htmlFor="parentCategory"
            className="block text-gray-600 font-medium"
          >
            Perent Category
          </label>
          <select
            id="parentCategory"
            {...register("parent_id")}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none"
          >
            <option value="">Select a category</option>
            {parentCategories.map((category) => (
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
          {errors.categoryName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categoryName.message}
            </p>
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
