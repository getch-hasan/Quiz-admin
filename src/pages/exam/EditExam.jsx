import React, { useCallback, useEffect, useState } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { useNavigate, useParams } from "react-router-dom";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import { SkeletonForm } from "../../components/loading/skeleton-table";
import {
  ImageUpload,
  SingleSelect,
  TextCheckbox,
  TextInput,
} from "../../components/input";
import { FaRegEdit } from "react-icons/fa";

const EditExam = () => {
  const [categories, setCategories] = useState([]);
  const [exam, setExam] = useState({});
  const [loading, setLoading] = useState(false);
  const { examId } = useParams(); // Get the examId from URL

  const navigate = useNavigate();
  const {
   
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });

  console.log("categories", categories);
  console.log("exam", exam);

  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();
      if (response && response.status === 200) {
        const result = response.data.data.map((item, index) => {
          return {
            label: item.category_name,
            value: item.category_name,
            ...item,
          };
        });
        setCategories(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setLoading(false);
  }, []);

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  // Fetch the exam details from the API and populate the form
  const fetchExam = async (examId) => {
    try {
      const response = await NetworkServices.Exam.show(examId);
      if (response && response.status === 200) {
        const exam = response?.data?.data;
        setExam(exam);

        // Populate the form with the existing exam data
        setValue("category_id", exam.category_id);
        setValue("exam_name", exam.exam_name);
        setValue("total_marks", exam?.total_marks);
        setValue("total_questions", exam?.total_questions);
        setValue("duration", exam.duration);

        setValue("status", exam.status);
      }
    } catch (error) {
      console.error("Error fetching exam:", error);
    }
  };

  useEffect(() => {
    if (examId) {
      fetchExam(examId);
    }
  }, [examId]);

  // Update form submission
  const onFormSubmit = async (data) => {
    console.log("data", data);
    try {
      setLoading(true);
      setLoading(true);

      const formData = new FormData();
      formData.append("category_id", data.category_id);
      formData.append("exam_name", data.exam_name);
      formData.append("total_marks", data?.total_marks);
      formData.append("total_questions", data?.total_questions);
      formData.append("duration", data.duration);
      formData.append("status", data.status);
      formData.append("_method", "PUT");

      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail); // Ensure file is uploaded
      }

      const response = await NetworkServices.Exam.update(examId, formData);
      console.log("response", response);
      if (response && response.status === 200) {
        navigate("/dashboard/exam-list");
        Toastify.Success(examId ? "Exam Updated." : "Exam Created.");
      }
    } catch (error) {
      console.log("Error:", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <div className="text-center">
        <PageHeaderSkeleton />
        <SkeletonForm />
      </div>
    );
  }
  const propsData = {
    pageTitle: examId ? "Edit Exam" : "Create Exam",
    pageIcon: <FaRegEdit />,
    buttonName: "Exam List",
    buttonUrl: "/dashboard/exam-list",
    type: "list", // Change type based on whether we're editing or adding
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
          <SingleSelect
            name="singleSelect"
            control={control}
            options={categories}
            // rules={{ required: "Category selection is required" }}
            onSelected={(selected) =>
              setValue("category_id", selected?.category_id)
            }
            placeholder={
              categories.find(
                (item) => item?.category_id == watch("category_id")
              )?.category_name ?? "Select Parent Category"
            }
            error={errors.singleSelect?.message}
            label="Choose a category"
            defaultValue={categories?.category_name}
            // error={errors} // Pass an error message if validation fails
          />
        </div>

        {/* Exam Name */}

        <TextInput
          name="exam_name"
          control={control}
          label="Exam Name *"
          type="text"
          placeholder="Exam"
          // rules={{ required: "Category is required" }} // Validation rule
          error={errors.exam_name?.message} // Show error message
        />

        {/* Grid Layout for Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Total Marks */}
          <TextInput
            name="total_marks"
            control={control}
            label="Total Mark *"
            type="text"
            placeholder="total mark"
            // rules={{ required: "Category is required" }} // Validation rule
            error={errors.total_marks?.message} // Show error message
          />

          {/* Total Questions */}
          <TextInput
            name="total_questions"
            control={control}
            label="Total Question *"
            type="number"
            placeholder="total question"
            error={errors.total_questions?.message} // Show error message
          />

          {/* Duration */}
          <TextInput
            name="duration"
            control={control}
            label="Duration *"
            type="number"
            placeholder="total question"
            error={errors.duration?.message} // Show error message
          />

          {/* Thumbnail Upload */}
          <div className="mt-4 cursor-pointer">
            <ImageUpload
              name="thumbnail"
              control={control}
              label="Category Picture"
              onUpload={(file) => setValue("thumbnail", file)}
              imgUrl={exam?.thumbnail}
            />
          </div>
        </div>

        {/* Status (Checkbox) */}
        <div className="flex items-center  mt-4 ">
          <TextCheckbox
            type="checkbox"
            name="status"
            className=""
            control={control}
            onChange={(e) => setValue("status", e.target.checked ? 1 : 0)}
            checked={watch("status") == 1} // If status is 1, checked = true
          />
          <label htmlFor="status" className="text-sm text-gray-700">
            Status
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-4 px-4 py-2 text-white rounded-md transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : examId ? "Update Exam" : "Create Exam"}
        </button>
      </form>
    </>
  );
};

export default EditExam;
