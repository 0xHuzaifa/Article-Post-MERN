"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Editor } from "@/components/lexical/Editor";
import { getAllCategories } from "../../redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { createArticle, updateArticle } from "../../redux/slices/articleSlice";
import { useNavigate } from "react-router-dom";

const initialForm = {
  title: "",
  category: "",
  content: "",
  isPublished: false,
};

export default function ArticleForm() {
  const { mode, selectedFormData } = useSelector((state) => state.form);
  const { categories } = useSelector((state) => state.category);
  const { isLoading } = useSelector((state) => state.article);

  // Initialize with empty state first
  const [formData, setFormData] = useState(initialForm);
  const [clickedButton, setClickedButton] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(getAllCategories());
    }
  }, [dispatch]);

  useEffect(() => {
    if (mode === "edit" && selectedFormData) {
      setFormData({
        title: selectedFormData.title,
        category: selectedFormData.category.name,
        content: selectedFormData.content,
        isPublished: selectedFormData.isPublished,
      });
    } else {
      setFormData(initialForm);
    }
  }, [mode, selectedFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = async (publish) => {
    setClickedButton(publish ? "publish" : "draft");
    const updatedFormData = {
      ...formData,
      isPublished: publish,
    };

    // Add the article ID for updates
    if (mode === "edit" && selectedFormData?._id) {
      updatedFormData.id = selectedFormData._id;
    }

    console.log("Submitting article:", updatedFormData);
    let result;
    if (mode === "edit") {
      result = await dispatch(updateArticle(updatedFormData));
    } else {
      result = await dispatch(createArticle(updatedFormData));
    }
    if (result.meta.requestStatus === "fulfilled") {
      console.log("result", result);
      if (publish) {
        // navigate to newly created article
        navigate(`/articles/${result.payload.slug}`);
      } else {
        navigate("/dashboard/my-articles");
      }
    }
  };

  return (
    <div className="w-full p-6 md:p-8 lg:p-10 bg-blue-gray-50">
      <Typography
        color="blue-gray"
        className="mb-4 text-4xl md:text-5xl font-bold"
      >
        {mode === "edit" ? "Edit Article" : "Create New Article"}
      </Typography>
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto border">
          <CardBody className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
              <div className="w-full">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Title
                </Typography>
                <Input
                  size="md"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter article title"
                  className="focus:!border-gray-900 !border-[2px] !border-transparent ring-1 ring-blue-gray-200 placeholder:text-gray-500 placeholder:opacity-100 focus:ring-transparent"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="w-full">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Category
                </Typography>
                <Select
                  label="Select Category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <Option key={category.name} value={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Content
              </Typography>
              <Editor
                value={formData.content}
                onChange={(newValue) => handleEditorChange(newValue)}
              />
            </div>
          </CardBody>

          <CardFooter className="flex justify-end gap-4 pt-0">
            <Button
              variant="outlined"
              color="blue-gray"
              onClick={() => handleSubmit(false)}
              className="flex items-center gap-2 disabled:opacity-50"
              loading={isLoading && clickedButton === "draft"}
              disabled={isLoading}
            >
              {mode === "edit" ? "Update" : "Save as Draft"}
            </Button>
            <Button
              color="blue"
              onClick={() => handleSubmit(true)}
              className="flex items-center gap-2 disabled:opacity-50"
              loading={isLoading && clickedButton === "publish"}
              disabled={isLoading}
            >
              <PencilIcon className="h-4 w-4" />
              {mode === "edit" ? "Update & Publish" : "Publish"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
