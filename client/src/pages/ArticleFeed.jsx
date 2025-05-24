import React, { useEffect, useState } from "react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Pagination } from "@/components/common/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getPublishArticles } from "@/redux/slices/articleSlice";
import { Card, Typography } from "@material-tailwind/react";

const AllArticles = [
  {
    title: "UI/UX Review Check1",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main night life in Barcelona.",
    category: "Category",
  },
  {
    title: "UI/UX Review Check2",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main night life in Barcelona. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt officiis suscipit amet laudantium cupiditate odit voluptatum quidem, natus corporis totam distinctio, eos magnam nam nihil veritatis labore libero ipsam iure?",
    category: "Category",
  },
  {
    title: "UI/UX Review Check3",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main night life in Barcelona.",
    category: "Category",
  },
  {
    title: "UI/UX Review Check4",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main night life in Barcelona.",
    category: "Category",
  },
  {
    title: "UI/UX Review Check5",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main night life in Barcelona.",
    category: "Category",
  },
  {
    title: "UI/UX Review Check6",
    description:
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main night life in Barcelona.",
    category: "Category",
  },
];

export default function ArticleFeed() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const { publishArticles } = useSelector((state) => state.article);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!publishArticles || publishArticles.length === 0) {
      dispatch(getPublishArticles());
    }
  }, [dispatch, publishArticles]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentArticles = publishArticles.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="w-full bg-blue-gray-50 min-h-screen pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mx-auto justify-items-center">
        {publishArticles && publishArticles?.length > 0 ? (
          currentArticles.map((article) => (
            <ArticleCard
              key={article.title}
              title={article.title}
              category={article.category.name}
              content={article.content}
              slug={article.slug}
            />
          ))
        ) : (
          <Card className="w-full max-w-md flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-md">
            <span className="material-icons text-blue-gray-400 text-6xl mb-4">
              info
            </span>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              No Articles Found
            </Typography>
            <Typography color="gray" className="text-center">
              There are currently no published articles to display.
            </Typography>
          </Card>
        )}
      </div>
      <div className="flex justify-center items-center p-2 mt-5">
        <Pagination
          totalPost={publishArticles?.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
