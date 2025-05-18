import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const loginData = {
  email: "",
  password: "",
};

export function Login() {
  const [formData, setFormData] = useState(loginData);

  const { isLoading, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from.pathname || "/dashboard";

  useEffect(() => {
    if (isLogin) {
      navigate(from, { replace: true });
    }
  }, [isLogin, navigate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
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
                Your Email
              </Typography>
              <Input
                name="email"
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                onChange={handleInput}
                value={formData.email}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {/* Password field */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                name="password"
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
              log in
            </Button>

            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link to={"/signup"} className="font-medium text-gray-900">
                Sign Up
              </Link>
            </Typography>

            <Typography
              onClick={() => navigate("/")}
              color="gray"
              className="mt-2 text-center font-normal hover:text-blue-gray-900 cursor-pointer"
            >
              Visit Home Page
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}
