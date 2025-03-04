import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { IoMdCreate } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller, responseChecker } from "../../utils/helper";
import { SingleSelect, TextAreaInput, TextInput } from "../../components/input";
import PageHeaderSkeleton from "../../components/loading/pageHeader-skeleton";
import { SkeletonForm } from "../../components/loading/skeleton-table";

export const CreateQuestion = () => {
  const [categories, setCategories] = useState([]);
  const [exam, setExam] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [options, setOptions] = useState([
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
  ]);

  const handleOptionChange = (index, e) => {
    const updatedOptions = [...options];
    updatedOptions[index].name = e.target.value;
    setOptions(updatedOptions);
  };

  const handleCheckboxChange = (index, e) => {
    const updatedOptions = [...options];
    updatedOptions[index].is_correct = e.target.checked ? 1 : 0;
    setOptions(updatedOptions);
  };
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
            value: item.category_id,
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
  }, [fetchCategory]);

  // fetch exam
  const fetchExam = useCallback(async (categoryId) => {
    // setLoading(true);
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
    // setLoading(false);
  }, []);

  useEffect(() => {
    if (categoryId) {
      console.log("Category Changed:", categoryId);
      setValue("exam_id", null);
      setExam([]);
      fetchExam(categoryId);
    }
  }, [categoryId, setValue, fetchExam]);

  // question post api
  const onSubmit = async (data) => {
    console.log("Question Saved:", data);

    try {
      setLoading(true);
      const response = await NetworkServices.Question.store(data);
      console.log(response?.data?.data?.question_id, "---------------");
      if (response && response.status === 200) {
        // navigate("/dashboard/question-list");
        Toastify.Success("Question Created.");
      }
      const newobj = {
        question_id: response?.data?.data?.question_id,
        option: options,
      };
      const result = await NetworkServices.Option.store(newobj);
      // console.log("response", response);
      if (responseChecker(result, 200)) {
        Toastify.Success("Option Created.");

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
    );
  }

  const propsData = {
    pageTitle: "Create New Question",
    pageIcon: <IoMdCreate />,
    buttonName: "Questions List",
    buttonUrl: "/dashboard/question-list",
    type: "list",
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
            name="category"
            control={control}
            options={categories}
            rules={{ required: "Category selection is required" }}
            onSelected={(selected) =>
              setValue("category_id", selected?.category_id)
            }
            placeholder="Select a category "
            error={errors.category?.message}
            label="Choose a category *"
            isClearable
            // error={errors} // Pass an error message if validation fails
          />
        </div>
        <div className="mb-4">
          <SingleSelect
            name="exam"
            control={control}
            options={exam}
            rules={{ required: "Exam   selection is required" }}
            onSelected={(selected) =>
              setValue("exam_id", selected?.exam_id || null)
            }
            placeholder="Select a Exam *"
            error={errors.exam?.message}
            label="Choose a exam *"
            isClearable
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
            error={errors?.question?.message}
            isClearable
            disabled={!categoryId}
          />
        </div>

        <div className="mb-4">
          <TextAreaInput
            name="q_description"
            control={control}
            label="Question Description Name *"
            placeholder="Enter your q_description name"
            error={errors?.q_description?.message} // Show error message
            isClearable={true}
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
            onSelected={(selected) =>
              setValue("difficulty_level", selected?.value)
            }
            placeholder="Select a Exam *"
            error={errors.difficulty?.message}
            label="Choose a difficulty *"
            isClearable={true}
          />
        </div>
        {/* option area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option, index) => (
            <div key={index}>
              <label className="text-sm  text-gray-500">{`Option ${
                index + 1
              }`}</label>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex-1">
                  <input
                    type="text"
                    value={option.name}
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
          className={`mt-4 px-4 py-2 text-white rounded-md transition ${
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
