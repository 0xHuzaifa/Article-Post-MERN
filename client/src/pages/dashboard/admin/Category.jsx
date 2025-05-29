import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CategoriesTable } from "@/components/categories/CategoriesTable";
import { useNavigate } from "react-router-dom";
import { ScrollText } from "lucide-react";
import {
  setFormMode,
  setSelectedFormData,
} from "../../../redux/slices/formSlice";

export default function Category() {
  const { isAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateCategory = () => {
    dispatch(setFormMode("create"));
    dispatch(setSelectedFormData(null));
    navigate("/dashboard/create-category");
  };

  return (
    <div className="w-full bg-blue-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-3 md:py-7">
        <Typography variant="h1" className="mb-8">
          Categories
        </Typography>
        <div className="w-full flex justify-end mx-3 mb-16">
          <Button
            variant="gradient"
            onClick={handleCreateCategory}
            className="flex justify-between items-center gap-2"
          >
            <ScrollText />
            Create New Category
          </Button>
        </div>

        <CategoriesTable />
      </div>
    </div>
  );
}
