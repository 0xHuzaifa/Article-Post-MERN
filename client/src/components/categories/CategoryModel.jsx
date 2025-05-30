import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

import { deleteCategory } from "../../redux/slices/categorySlice";
import { setFormMode, setSelectedFormData } from "../../redux/slices/formSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export function CategoryModel({ handleOpen, open, type, category }) {
  if (!category) return null;

  const { isLoading } = useSelector((state) => state.category);

  const isEdit = type === "edit";
  const title = isEdit ? "Edit Category" : "Delete Category";
  const desc = isEdit
    ? `Are you really want to update this category?".`
    : `Are you sure you want to delete this category? This action cannot be undone.`;

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (type === "edit") {
      dispatch(setFormMode("update"));
      dispatch(setSelectedFormData(category));
    } else if (type === "delete") {
      const result = await dispatch(deleteCategory(category._id));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Category Deleted Successfully");
      }
    }
    handleOpen();
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>
        <Typography variant="h5">{category.name}</Typography>
        <div className="mt-2">{desc}</div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        {isEdit ? (
          <Button
            onClick={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            className="disabled:opacity-50"
            variant="gradient"
            color="blue"
          >
            <span>Update</span>
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            className="disabled:opacity-50"
            variant="gradient"
            color="red"
          >
            <span>Delete</span>
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}
