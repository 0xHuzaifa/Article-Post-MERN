"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { DocumentTextIcon, PencilIcon } from "@heroicons/react/24/solid";
import Editor from "@/components/lexical/Editor";

const CATEGORIES = [
  "Technology",
  "Business",
  "Health",
  "Science",
  "Arts",
  "Sports",
  "Travel",
  "Food",
  "Education",
  "Other",
];

const articleState = {
  title: "",
  category: "",
  description: "",
  isDraft: true,
};

export default function CreateArticle() {
  const [article, setArticle] = useState(articleState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (editorState) => {
    // This would typically convert the Lexical editor state to HTML or JSON
    // For simplicity, we're just setting it directly
    setArticle((prev) => ({
      ...prev,
      content: editorState,
    }));
  };

  const handleCategoryChange = (value) => {
    setArticle((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = (isDraft = true) => {
    const articleToSubmit = {
      ...article,
      isDraft,
    };

    console.log("Submitting article:", articleToSubmit);

    // Here you would typically send the data to your backend
    // For example:
    // await fetch('/api/articles', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(articleToSubmit),
    // });

    // Reset form or redirect
    alert(isDraft ? "Article saved as draft" : "Article published!");
  };

  return (
    <div className="w-full p-6 md:p-8 lg:p-10">
      <Typography
        color="blue-gray"
        className="mb-4 text-4xl md:text-5xl font-bold"
      >
        Create New Article
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
                  value={article.title}
                  onChange={handleChange}
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
                  value={article.category}
                  onChange={handleCategoryChange}
                >
                  {CATEGORIES.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Content
              </Typography>
              <Editor onChange={handleEditorChange} />
            </div>
          </CardBody>

          <CardFooter className="flex justify-end gap-4 pt-0">
            <Button
              variant="outlined"
              color="blue-gray"
              onClick={() => handleSubmit(true)}
            >
              Save as Draft
            </Button>
            <Button
              color="blue"
              onClick={() => handleSubmit(false)}
              className="flex items-center gap-2"
            >
              <PencilIcon className="h-4 w-4" /> Publish
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
