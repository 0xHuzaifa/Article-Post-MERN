import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 px-4">
      <h1 className="text-9xl font-extrabold text-blue-500 mb-4 select-none">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link to="/">
        <Button color="blue" size="lg" ripple="light">
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
