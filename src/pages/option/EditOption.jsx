import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { PageHeader } from "../../components/PageHeading/PageHeading";
import { useNavigate, useParams } from "react-router-dom";
import { SingleSelect } from "../../components/input";
import { NetworkServices } from "../../network";
import { FaRegEdit } from "react-icons/fa";

export const EditOption = () => {
  const [options, setOptions] = useState([
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
    { name: "", is_correct: 0 },
  ]);
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [exam, setExam] = useState([]);
  const [option, setOption] = useState([]);

  const { optionId } = useParams(); // Get question ID from URL
  const navigate = useNavigate();

  console.log("categories",categories)
  console.log("exam",exam)
  console.log("question",question)
  console.log("option",option)

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const categoryId = watch("category_id");
  const examId = watch("exam_id");

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

  const addMoreOption = () => {
    if (options.length < 6) {
      setOptions([...options, { name: "", is_correct: 0 }]);
    }
  };

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

  // fetch exam
  const fetchQuestion = useCallback(async (examId) => {
    setLoading(true); // Start loading

    try {
      const response = await NetworkServices.Question.index(examId);

      if (response && response.status === 200) {
        const result = response.data.data.map((item, index) => {
          return {
            label: item.question,
            value: item.question,
            ...item,
          };
        });
        console.log(result);
        setQuestion(result);
      }
    } catch (error) {
      console.error("Fetch Category Error:", error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchQuestion(examId);
  }, [examId, fetchQuestion]);

    // Fetch Question Details
    const fetchOption = useCallback(async (optionId) => {
      try {
        setLoading(true);
        const response = await NetworkServices.Option.show(optionId);
        if (response?.status === 200) {
          const option = response.data.data;
          setOption(option);
  
          // Set form values
          setValue("exam_id", option?.exam_id || null);
          setValue("name", option?.question || "");
          setValue("q_description", question?.q_description || "");          
          setValue("difficulty_level", question?.difficulty_level || "");
          setValue("category_id", question?.category_id || null);
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
      setLoading(false);
    }, [setValue]);
  
    useEffect(() => {
      if (optionId) {
        fetchOption(optionId);
      }
    }, [optionId, fetchOption]);

  const onSubmit = (data) => {
    const payload = {
      options: options,
      question_id: data.question_id,
    };
    console.log("Options Saved:", payload);
    alert("Options Updated Successfully!");
    // navigate("/dashboard/questions");
  };

  const propsData = {
    pageTitle: "Edit Options",
    pageIcon: <FaRegEdit />,
    buttonName: "Option List",
    buttonUrl: "/dashboard/option-list",
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
          <SingleSelect
            name="singleSelectss"
            control={control}
            options={question}
            rules={{ required: "Question selection is required" }}
            onSelected={(selected) =>
              setValue("question_id", selected?.question_id)
            }
            placeholder="Select a Question *"
            error={errors.singleSelectss?.message}
            label="Choose a question *"
            disabled={!examId}
          />
        </div>
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

        <div className="flex justify-between gap-5 ">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none mt-4  "
          >
            {loading ? "Loading" : "Update Options"}
          </button>
          {options.length < 6 && (
            <button
              type="button"
              onClick={addMoreOption}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none mt-4  "
            >
              Add More Option
            </button>
          )}
        </div>
      </form>
    </>
  );
};
