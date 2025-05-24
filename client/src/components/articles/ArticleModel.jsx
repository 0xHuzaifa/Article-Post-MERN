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
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export function ArticleModel({ handleOpen, open, type, article }) {
  if (!article) return null;

  const isEdit = type === "edit";
  const title = isEdit ? "Edit Article" : "Delete Article";
  const desc = isEdit
    ? `Are you really want to update this article?".`
    : `Are you sure you want to delete this article? This action cannot be undone.`;

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (type === "edit") {
      dispatch(setFormMode("update"));
      dispatch(setSelectedFormData(article));
    } else if (type === "delete") {
      const result = await dispatch(deleteCategory(article._id));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Article Deleted Successfully");
      }
    }
    handleOpen();
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>
        <Typography variant="h5">{article.title}</Typography>
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
          <Button onClick={handleSubmit} variant="gradient" color="blue">
            <span>Update</span>
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant="gradient" color="red">
            <span>Delete</span>
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}
