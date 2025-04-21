import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useEffect, useState, useCallback } from "react";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { SingleSelect, TextAreaInput, TextInput } from "../../components/input";
import { FaRegEdit } from "react-icons/fa";
import { networkErrorHandeller } from "../../utils/helpers";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import CategoryFormSkeleton from "../../components/loading/exam-skeleton/examForm-skeleton";

export const EditQuestion = () => {
  // const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [exam, setExam] = useState([]);
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState([
    { option: "", is_correct: 0 },
    { option: "", is_correct: 0 },
    { option: "", is_correct: 0 },
    { option: "", is_correct: 0 },
  ]);

  const handleOptionChange = (index, e) => {
    const updatedOptions = [...options];
    updatedOptions[index].option = e.target.value;
    setOptions(updatedOptions);
  };

  const handleCheckboxChange = (index, e) => {
    const updatedOptions = [...options];
    updatedOptions[index].is_correct = e.target.checked ? 1 : 0;
    setOptions(updatedOptions);
  };

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const categoryId = watch("category_id");

  // Fetch categories
  const fetchCategory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Category.index();
      if (response?.status === 200) {
        const result = response.data.data.map((item) => ({
          label: item.category_name,
          value: item.category_id, // Change to category_id
          ...item,
        }));
        setCategories(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  // Fetch exam based on category
  const fetchExam = useCallback(async (categoryId) => {
    try {
      const response = await NetworkServices.Exam.index({
        params: { category_id: categoryId },
      });
      if (response?.status === 200) {
        const result = response.data.data.map((item) => ({
          label: item.exam_name,
          value: item.exam_id, // Change to exam_id
          ...item,
        }));
        setExam(result);
      }
    } catch (error) {
      console.error("Fetch Exam Error:", error);
    }
  }, []);

  useEffect(() => {
    if (categoryId) {
      setExam([]); // Reset exam list when category changes
      fetchExam(categoryId);
    }
  }, [categoryId, fetchExam]);

  // Fetch Question Details
  const fetchQuestion = useCallback(
    async (questionId) => {
      try {
        setLoading(true);
        const response = await NetworkServices.Question.show(questionId);
        if (response?.status === 200) {
          const question = response.data.data;
          setOptions(question?.option);

          console.log("question,,", question);
          // setQuestionData(question);

          // Set form values
          setValue("exam_id", question?.exam_id || null);
          setValue("name", question?.question || "");
          setValue("q_description", question?.q_description || "");
          setValue("category_id", question?.category_id || null);
          setValue("difficulty_level", question?.difficulty_level || "");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
      setLoading(false);
    },
    [setValue]
  );

  useEffect(() => {
    if (questionId) {
      fetchQuestion(questionId);
    }
  }, [questionId, fetchQuestion]);

  // Submit function
  const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append("exam_id", data.exam_id);
    formData.append("question", data.name);
    formData.append("q_description", data.q_description);
    formData.append("category_id", data.category_id);
    formData.append("difficulty_level", data.difficulty_level);
    formData.append("question_id", questionId);
    formData.append("options", JSON.stringify(options));
    
    formData.append("_method", "PUT");


  
    
    // const obj = {
    //   exam_id: 23,
    //   question: data.name,
    //   q_description: data.q_description,
    //   category_id: data.category_id,
    //   difficulty_level: data.difficulty_level,
    //   options: options,
    // };

    try {
      setBtnLoading(true)
      const response = await NetworkServices.Question.update(questionId, formData);
      if (response?.status === 200) {
        navigate("/dashboard/question-list");
        Toastify.Success("Question Updated Successfully.");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    finally{
      setBtnLoading(false)
    }
  };

  const propsData = {
    pageTitle: "Edit Question",
    pageIcon: <FaRegEdit />,
    buttonName: "Questions List",
    buttonUrl: "/dashboard/question-list",
    type: "list",
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
        className="mx-auto p-4 border border-gray-200 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Category Selection */}
        <div className="mb-4">
          <SingleSelect
            name="category_id"
            control={control}
            options={categories}
            onSelected={(selected) =>
              setValue("category_id", selected?.value || null)
            }
            placeholder={
              categories.find((item) => item.value === watch("category_id"))
                ?.label ?? "Select Category"
            }
            error={errors.category_id?.message}
            label="Choose a Category *"
            isClearable
          />
        </div>

        {/* Exam Selection */}
        <div className="mb-4">
          <SingleSelect
            name="exam_id"
            control={control}
            options={exam}
            onSelected={(selected) =>
              setValue("exam_id", selected?.value || null)
            }
            placeholder={
              exam.find((item) => item.value === watch("exam_id"))?.label ??
              "Select an Exam"
            }
            error={errors.exam_id?.message}
            label="Choose an Exam *"
            isClearable
          />
        </div>
        {/* question name */}
        <div className="mb-4">
          <TextInput
            name="name"
            control={control}
            label="Question Name *"
            type="text"
            placeholder="Question"
            // rules={{ required: "Category is required" }} // Validation rule
            error={errors.name?.message} // Show error message
          />
        </div>

        {/* Question Description */}
        <div className="mb-4">
          <TextAreaInput
            name="q_description"
            control={control}
            label="Question Description "
            placeholder="Enter question description"
            error={errors.q_description?.message}
          />
        </div>

        {/* Difficulty Level Selection */}
        <div className="mb-4">
          <SingleSelect
            name="difficulty_level"
            control={control}
            options={[
              { label: "Easy", value: "easy" },
              { label: "Medium", value: "medium" },
              { label: "Hard", value: "hard" },
            ]}
            onSelected={(selected) =>
              setValue("difficulty_level", selected?.value || null)
            }
            placeholder={watch("difficulty_level") || "Select Difficulty"}
            error={errors.difficulty_level?.message}
            label="Choose Difficulty "
            isClearable
          />
        </div>
        {/* option area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {options.map((option, index) => (
            <div key={index}>
              <label className="text-sm  text-gray-500">{`Option ${
                index + 1
              }`}</label>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex-1">
                  <input
                    type="text"
                    value={option?.option}
                    onChange={(e) => handleOptionChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none text-sm mb-1 text-gray-500"
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
                <div className="w-auto flex items-center">
                  <input
                    type="checkbox"
                    checked={option.is_correct === 1}
                    onChange={(e) => handleCheckboxChange(index, e)}
                    className="mr-2"
                  />
                  <span className="text-sm">Correct Option</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md transition cursor-pointer ${
            btnloading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={btnloading}
        >
          {btnloading ? "Updating..." : "Update Question"}
        </button>
      </form>
    </>
  );
};
