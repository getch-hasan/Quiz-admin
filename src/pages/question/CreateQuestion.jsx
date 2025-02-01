import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoIosCreate } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helper";
import { SingleSelect, TextAreaInput, TextInput } from "../../components/input";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import { SkeletonForm } from "../../components/loading/skeleton-table";

export const CreateQuestion = () => {
  const [categories, setCategories] = useState([]);
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({});
  //  i want to see category id
  const categoryId = watch("category_id");

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
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchCategory();
  }, []);
  // fetch exam
  const fetchExam = useCallback(async (categoryId) => {
    // setLoading(true); // Start loading
    try {
      const response = await NetworkServices.Exam.index({
        params: { category_id: categoryId },
      });

      if (response && response.status === 200) {
        const result = response.data.data.map((item, index) => {
          return {
            label: item.exam_name,
            value: item.exam_name,
            ...item,
          };
        });
        console.log(result);
        setExam(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    // setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchExam(categoryId);
  }, [categoryId]);

  // question post api
  const onSubmit = async (data) => {
    console.log("Question Saved:", data);
    try {
      setLoading(true);
      const response = await NetworkServices.Question.store(data);
      if (response && response.status === 200) {
        navigate("/dashboard/question-list");
        return Toastify.Success("Question Created.");
      }
    } catch (error) {
      console.log("error", error);
      networkErrorHandeller(error);
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <div className="text-center">
        {" "}
        <PageHeaderSkeleton />
        <br />
        <SkeletonForm />{" "}
      </div>
    ); // skeleton loading  when loading state is true  (for better user experience)  // skeletonForm is a custom component for loading form
  }
  const propsData = {
    pageTitle: "Create New Question",
    pageIcon: <IoIosCreate />,
    buttonName: "Questions List",
    buttonUrl: "/dashboard/question-list",
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
          <SingleSelect
            name="singleSelect"
            control={control}
            options={categories}
            rules={{ required: "Category selection is required" }}
            onSelected={(selected) =>
              setValue("category_id", selected?.category_id)
            }
            placeholder="Select a category "
            error={errors.singleSelect?.message}
            label="Choose a category *"
            // error={errors} // Pass an error message if validation fails
          />
        </div>
        <div className="mb-4">
          <SingleSelect
            name="singleSelects"
            control={control}
            options={exam}
            rules={{ required: "Exam   selection is required" }}
            onSelected={(selected) => setValue("exam_id", selected?.exam_id)}
            placeholder="Select a Exam *"
            error={errors.singleSelects?.message}
            label="Choose a exam *"
            disabled={!categoryId}
          />
        </div>

        <div className="mb-4">
          <TextInput
            name="question"
            control={control}
            label="Question Name *"
            placeholder="Enter your Question name"
            rules={{ required: "Question Name is required" }} // Validation rule
            error={errors?.question?.message} // Show error message
          />
        </div>

        <div className="mb-4">
          <TextAreaInput
            name="q_description"
            control={control}
            label="Question Description Name *"
            placeholder="Enter your q_description name"
            rules={{ required: "Question description   is required" }} // Validation rule
            error={errors?.q_description?.message} // Show error message
          />
        </div>

        <div className="mb-4">
          <SingleSelect
            name="difficulty"
            control={control}
            options={[
              { label: "Easy", value: "easy" },
              { label: "Medium", value: "medium" },
              { label: "Hard", value: "hard" },
            ]}
            rules={{ required: "Difficulty  selection is required" }}
            onSelected={(selected) =>
              setValue("difficulty_level", selected?.value)
            }
            placeholder="Select a Exam *"
            error={errors.difficulty?.message}
            label="Choose a difficulty *"
            // disabled={!categoryId}
          />
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
