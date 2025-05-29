import { Card, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const initialProfile = {
  username: "",
  email: "",
};

export function Profile() {
  const { user } = useSelector((state) => state.auth);

  const [userProfile, setUserProfile] = useState(initialProfile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserProfile({
        username: user?.username,
        email: user?.email,
      });
    } else {
      dispatch(logout());
    }
  }, [user]);

  return (
    <div className="w-full h-[100dvh] bg-blue-gray-50 p-5 md:p-12">
      <Typography variant="h1" color="blue-gray">
        Profile
      </Typography>
      <div className="w-full flex justify-center p-2 md:p-4 lg:p-6 mt-8">
        <Card color="transparent" className="w-fit p-5 bg-white/30">
          <Typography variant="h4" color="blue-gray">
            User Detail
          </Typography>

          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              {/* Username field */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                UserName
              </Typography>
              <Input
                name="username"
                type="text"
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 disabled:opacity-80"
                value={userProfile.username}
                disabled={true}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {/* Email field */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                name="email"
                type="email"
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 disabled:opacity-80"
                value={userProfile.email}
                disabled={true}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <Typography
              onClick={() => navigate("/")}
              color="gray"
              className="mt-4 text-center font-normal hover:text-blue-500 cursor-pointer"
            >
              Visit Home Page
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}
