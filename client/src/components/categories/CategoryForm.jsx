import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  createCategory,
  updateCategory,
} from "../../redux/slices/categorySlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CategoryForm({ category }) {
  const categoryData = {
    name: category.name || "",
    description: category.description || "",
  };

  const [formData, setFormData] = useState(categoryData);
  const { isLoading } = useSelector((state) => state.category);
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
    const result = await dispatch(createCategory(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="w-full h-[100dvh] flex justify-center items-center bg-blue-gray-50">
      <div className="w-full h-full flex justify-center items-center p-2 md:p-4 lg:p-6">
        <Card color="transparent" className="w-fit p-5 bg-white/30">
          <Typography variant="h4" color="blue-gray">
            LogIn
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome Again! Enter your details to SignIn.
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
                placeholder="Category"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                onChange={handleInput}
                value={formData.email}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {/* Password field */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Category Description
              </Typography>
              <Input
                name="description"
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                onChange={handleInput}
                value={formData.password}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button
              disabled={isLoading}
              type="submit"
              className="mt-6 disabled:opacity-50 disabled:cursor-none"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default CategoryForm;
