import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArticlesTable } from "@/components/articles/ArticlesTable";
import { useNavigate } from "react-router-dom";
import { ScrollText } from "lucide-react";
import { getMyArticles, getPublishArticles } from "../../../redux/slices/articleSlice";

const tabsData = [
  { label: "Publish", value: "publish" },
  { label: "Draft", value: "draft" },
];

export default function Articles() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { publishArticles, isLoading } = useSelector(
    (state) => state.article
  ); // array

  useEffect(() => {
    if (!publishArticles || publishArticles.length === 0) {
      dispatch(getPublishArticles());
    }
  }, []);

  return (
    <div className="w-full bg-blue-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-3 md:py-7">
        <Typography variant="h1" className="mb-8">
          All Articles
        </Typography>
        <div className="w-full flex justify-end mx-3 mb-5">
          <Button
            variant="gradient"
            onClick={() => navigate("/dashboard/create-article")}
            className="flex justify-between items-center gap-2"
          >
            <ScrollText />
            Create New Article
          </Button>
        </div>
        <div className="w-full mt-16">
          <ArticlesTable articles={publishArticles} isLoading={isLoading} userArticles={false} />
        </div>
      </div>
    </div>
  );
}
