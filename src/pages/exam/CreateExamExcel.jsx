import React, { useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useForm } from "react-hook-form";
import { ExcelUpload } from "../../components/input";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helpers";


const CreateExamExcel = () => {

  
  const [btnloading, setBtnLoading] = useState(false);
  const { id } = useParams();
  console.log("id", id);

  const {
 
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  const navigate = useNavigate();

  const onFormSubmit = async (data) => {
    try {
      setBtnLoading(true);
      const formData = new FormData();
      formData.append("exam_id", id);
      formData.append("question_file", data.file);

      const response = await NetworkServices.Question.store(formData);
      if (response && response.status === 200) {
        navigate("/dashboard/question-list");
        return Toastify.Success("Create Question Successfully");
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const propsData = {
    pageTitle: " Create Exam With Excel ",
    pageIcon: <IoMdCreate />,
    buttonName: "Exam List",
    buttonUrl: "/dashboard/exam-list",
    type: "list", // This indicates the page type for the button
  };

  return (
    <div>
      <PageHeader propsData={propsData} />
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="p-4 shadow-md rounded-md bg-lightCard dark:bg-darkCard"
      >
        <ExcelUpload
          name="file"
          label="Upload Excel"
          control={control}
          required={true}
          error={errors.file?.message}
          onUpload={(file) => console.log("File selected:", file)}
        />
        <button
          type="submit"
          className={`mt-4 px-4 py-2 text-white rounded-md transition cursor-pointer ${
            btnloading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={btnloading} // Disable button when loading
        >
          {btnloading ? "Loading..." : "Create Question"}
        </button>
      </form>
    </div>
  );
};

export default CreateExamExcel;
