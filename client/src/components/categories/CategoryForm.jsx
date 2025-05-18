import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
  Textarea,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  createCategory,
  updateCategory,
} from "../../redux/slices/categorySlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CategoryForm() {
  const { mode, selectedFormData } = useSelector((state) => state.form);
  const { isLoading } = useSelector((state) => state.category);

  const categoryData = {
    name: selectedFormData?.name || "",
    description: selectedFormData?.description || "",
  };

  const [formData, setFormData] = useState(categoryData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit");
    const result = await dispatch(createCategory(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard/categories");
    }
  };

  return (
    <div className="w-full h-[100dvh] flex justify-center items-center bg-blue-gray-50">
      <div className="w-full h-full flex justify-center items-center p-2 md:p-4 lg:p-6">
        <Card color="transparent" className="w-fit p-5 bg-white/30">
          <Typography variant="h4" color="blue-gray">
            {mode === "create" ? "Create New Category" : "Update Category"}
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              {/* Email field */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Category Name
              </Typography>
              <Input
                name="name"
                size="lg"
                placeholder="Enter Category Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                onChange={handleInput}
                value={formData.email}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {/* Category Description field */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Category Description
              </Typography>
              <Textarea
                name="description"
                type="text"
                size="lg"
                placeholder="Enter Your Category Description"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:opacity-0 focus:placeholder:opacity-100"
                onChange={handleInput}
                value={formData.password}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              className="mt-6 disabled:opacity-50 disabled:cursor-none"
              fullWidth
            >
              {mode === "create" ? "Submit" : "Update"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default CategoryForm;
