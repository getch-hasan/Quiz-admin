import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoIosCreate } from "react-icons/io";
import { useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import { useCallback } from "react";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import { Toastify } from "../../components/toastify";
import { SingleSelect } from "../../components/input";

export const EditQuestion = () => {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [exam, setExam] = useState([]);

  const { questionId } = useParams();

  console.log("qdata", questionData);
  console.log("qdatacate", categories);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();

  console.log("categories", categories);
  console.log("exam", exam);
  // Fetch categories from API
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
  // Fetch exam from API
  const fetchExam = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Exam.index();
      if (response && response.status === 200) {
        const result = response.data.data.map((item, index) => {
          return {
            label: item.exam_name,
            value: item.exam_name,
            ...item,
          };
        });
        setExam(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchExam();
  }, [fetchExam]);

  // Fetch the category details from the API and populate the form
  const fetchQuestion = useCallback(
    async (questionId) => {
      try {
        setLoading(true);
        const response = await NetworkServices.Question.show(questionId);
        console.log("responserrrr", response);
        if (response && response.status === 200) {
          const question = response?.data?.data;
          setQuestionData(question);

          // Correctly use the fetched data for setting the form values
          setValue("exam", question?.exam_id);
          setValue("name", question?.question);
          setValue("description", question?.q_description || "");
          setValue("category_id", question?.category_id);
          setValue("difficulty", question?.difficulty_level);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
      setLoading(false);
    },
    [setValue, setLoading]
  );

  useEffect(() => {
    if (questionId) {
      fetchQuestion(questionId);
    }
  }, [questionId, setValue]);

  const onSubmit = async (data) => {
    console.log("data", data);
    // update function for category
    const formData = new FormData();
    formData.append("exam_id", data.exam);
    formData.append("question", data.name);
    formData.append("q_description", data.description);
    formData.append("category_id", data.category);
    formData.append("difficulty_level", data.difficulty);
    formData.append("_method", "PUT");
    try {
      const response = await NetworkServices.Question.update(
        questionId,
        formData
      );

      console.log("update", response);
      if (response && response.status === 200) {
        navigate("/dashboard/question-list");
        return Toastify.Success("Category Updated.");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };

  const propsData = {
    pageTitle: "Edit Question",
    pageIcon: <IoIosCreate />,
    buttonName: "Back to Questions",
    buttonUrl: "/dashboard/questions",
    type: "edit",
  };

  // if (!questionData) {
  //   return <div>Loading...</div>; // Loading state while data is fetched
  // }

  return (
    <>
      <PageHeader propsData={propsData} />
      <form
        className="mx-auto p-4 border border-gray-200 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
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

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Question Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Question Name is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Select a category</option>
            {parentCategories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div> */}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <select
            {...register("difficulty", { required: "Difficulty is required" })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          {errors.difficulty && (
            <p className="text-red-500 text-sm">{errors.difficulty.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : "Update Question"}
        </button>
      </form>
    </>
  );
};
