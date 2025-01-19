import React from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoMdCreate } from "react-icons/io";
import { useForm } from "react-hook-form";

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    
  });

  const onFormSubmit = (data) => {

    console.log("object",data);
    
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

      <form onSubmit={handleSubmit(onFormSubmit)} className="p-4 shadow-md rounded-md bg-white">
      
      
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
        {errors.categoryName && <p className="text-red-500 text-sm mt-1">{errors.categoryName.message}</p>}
      </div>
      
      {/* Submit Button */}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Create Category
      </button>
    </form>
    </>
  );
};

export default CreateCategory;
