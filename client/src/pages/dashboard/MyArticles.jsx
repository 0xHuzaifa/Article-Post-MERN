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
import { getMyArticles } from "../../redux/slices/articleSlice";
import { setFormMode, setSelectedFormData } from "../../redux/slices/formSlice";

const tabsData = [
  { label: "Publish", value: "publish" },
  { label: "Draft", value: "draft" },
];

export default function MyArticles() {
  const [activeTab, setActiveTab] = useState("publish");
  const [articlesData, setArticlesData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userArticles, userDraftArticles, isLoading } = useSelector(
    (state) => state.article
  ); // array

  useEffect(() => {
    if (!userArticles || userArticles.length === 0) {
      dispatch(getMyArticles());
    }
  }, []);

  useEffect(() => {
    if (activeTab === "publish") {
      setArticlesData(userArticles);
    } else if (activeTab === "draft") {
      setArticlesData(userDraftArticles);
    }
  }, [activeTab, userArticles, userDraftArticles]);

  // Replace your handleTabChange with:
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleCreateArticle = () => {
    dispatch(setFormMode("create"));
    dispatch(setSelectedFormData(null));
    navigate("/dashboard/create-article");
  };

  return (
    <div className="w-full bg-blue-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-3 md:py-7">
        <Typography variant="h1" className="mb-8">
          My Articles
        </Typography>
        <div className="w-full flex justify-end mx-3 mb-5">
          <Button
            variant="gradient"
            onClick={handleCreateArticle}
            className="flex justify-between items-center gap-2"
          >
            <ScrollText />
            Create New Article
          </Button>
        </div>
        <div>
          <Tabs value={activeTab} className="">
            <TabsHeader className="max-w-80 bg-blue-gray-100 mb-5">
              {tabsData.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  className="font-semibold"
                  onClick={() => handleTabChange(value)}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              <ArticlesTable
                articles={articlesData}
                isLoading={isLoading}
                userArticles={true}
              />
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
