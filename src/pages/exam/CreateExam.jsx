import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { ImageUpload, SingleSelect, TextInput } from "../../components/input";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import { IoMdCreate } from "react-icons/io";

const CreateExam = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
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
        // setCategories(response?.data?.data);
        const categories = response?.data?.data?.map((item) => ({
          value: item.category_name, // Convert "name" to "value"
          label: item.category_name, // Keep "name" as the label
          ...item,
        }));
        setCategories(categories);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const onFormSubmit = async (data) => {
    try {
      setBtnLoading(true);
      const formData = new FormData();
      formData.append("category_id", data.category_id);
      formData.append("exam_name", data.exam_name);
      formData.append("total_marks", data.total_marks);
      formData.append("total_questions", data.total_questions);
      formData.append("duration", data.duration);
      formData.append("status", data.status);
      if (data.thumbnail && data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }
      const response = await NetworkServices.Exam.store(formData);
      if (response && response.status === 200) {
        navigate("/dashboard/exam-list");
        return Toastify.Success("Category Created.");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setBtnLoading(false);
  };
  const propsData = {
    pageTitle: " Create Exam ",
    pageIcon: <IoMdCreate />,
    buttonName: "Exam List",
    buttonUrl: "/dashboard/exam-list",
    type: "list", // This indicates the page type for the button
  };
  if (loading) {
    return (
      <>
        <PageHeaderSkeleton />
        <br />
        <CategoryFormSkeleton />
      </>
    );
  }
  return (
    <>
      <PageHeader propsData={propsData} />
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="p-4 shadow-md rounded-md bg-white"
      >
        {/* Category */}
        <div className="mb-4">
          <SingleSelect
            name="singleSelect"
            control={control}
            options={categories}
            rules={{ required: "Category selection is required" }}
            onSelected={(selected) =>
              setValue("category_id", selected?.category_id)
            }
            placeholder="Select a category *"
            error={errors.singleSelect?.message}
            label="Choose a category"
            // error={errors} // Pass an error message if validation fails
          />
        </div>

        {/* Exam Name */}
        <div className="mb-4">
          <TextInput
            name="exam_name"
            control={control}
            label="Exam Name *"
            placeholder="Enter your exam name"
            rules={{ required: "Exam Name is required" }} // Validation rule
            error={errors?.exam_name?.message} // Show error message
          />
        </div>

        {/* Grid Layout for Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Marks */}
          <div>
            <TextInput
              name="total_marks"
              control={control}
              label="Total Marks *"
              type="number"
              placeholder="Enter your total marks"
              rules={{ required: "Total marks is required" }} // Validation rule
              error={errors.total_marks?.message} // Show error message
            />
          </div>
          {/* Total Questions */}
          <div>
            <TextInput
              name="total_questions"
              control={control}
              label="Total Question *"
              type="number"
              placeholder="Enter your Total marks"
              rules={{ required: "Total questions is required" }} // Validation rule
              error={errors.total_questions?.message} // Show error message
            />
          </div>

          {/* Duration */}
          <div>
            <TextInput
              name="duration"
              control={control}
              label="Duration *"
              type="number"
              placeholder="Enter your Duration"
              rules={{ required: "Duration is required" }} // Validation rule
              error={errors.duration?.message} // Show error message
            />
          </div>
        </div>
        {/* Thumbnail Upload */}
        <div className="mt-4 cursor-pointer">
          <ImageUpload
            name="thumbnail"
            control={control}
            label="Category Picture"
            onUpload={(file) => setValue("thumbnail", file)}
          />
        </div>
        {/* Status (Checkbox) */}
        <div className="mt-4 cursor-pointer">
          {/* <label className="flex items-center"> */}
          <input
            type="checkbox"
            id="status"
            {...register("status")}
            className="mr-2 cursor-pointer"
            value="1"
            checked={watch("status") === 1}
            onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
          />
          <span className="text-gray-500 font-normal">Status</span>
          {/* </label> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-4 px-4 py-2 text-white rounded-md transition ${
            btnloading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={btnloading} // Disable button when loading
        >
          {btnloading ? "Loading..." : "Create Exam"}
        </button>
      </form>
    </>
  );
};

export default CreateExam;
