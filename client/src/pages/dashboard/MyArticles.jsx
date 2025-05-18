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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ArticlesTable } from "@/components/articles/ArticlesTable";
import { useNavigate } from "react-router-dom";
import { ScrollText } from "lucide-react";

const data = [
  { label: "Publish", value: "publish" },
  { label: "Draft", value: "draft" },
];

export default function MyArticles() {
  const [activeTab, setActiveTab] = useState("publish");
  const [articlesData, setArticlesData] = useState([]);
  const navigate = useNavigate();

  // Selectors for counts
  const {
    userArticles,
    userDraftArticles,
    isLoading: loadingArticles,
  } = useSelector((state) => state.article); // array
  const { categories, isLoading: loadingCategories } = useSelector(
    (state) => state.category
  ); // array
  const { isAdmin } = useSelector((state) => state.auth);

  const handleTabChange = () => {
    if(activeTab === "publish") {
      setArticlesData(userArticles)
    } else if (activeTab === 'draft') {
      setArticlesData(userDraftArticles)
    }
  }

  return (
    <div className="w-full bg-blue-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-3 md:py-7">
        <Typography variant="h1" className="mb-8">
          My Articles
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
        <div>
          <Tabs value={activeTab} className="">
            <TabsHeader className="max-w-80 bg-blue-gray-100 mb-5">
              {data.map(({ label, value }) => (
                <Tab key={value} value={value} className="font-semibold">
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              <ArticlesTable />
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
