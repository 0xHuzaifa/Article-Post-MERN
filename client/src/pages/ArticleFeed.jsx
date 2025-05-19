import React, { useEffect, useState } from "react";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Pagination } from "@/components/common/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getPublishArticles } from "@/redux/slices/articleSlice";

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
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const { publishArticles } = useSelector((state) => state.article);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!publishArticles || publishArticles.length === 0) {
      dispatch(getPublishArticles());
    }
  }, []);

  useEffect(() => {
    setArticles(publishArticles);
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentArticles = articles.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="w-full bg-blue-gray-50 min-h-screen pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mx-auto justify-items-center">
        {articles && articles?.length > 0 ? (
          articles.map((article) => (
            <ArticleCard
              key={article.title}
              title={article.title}
              category={article.category}
              content={article.content}
              slug={article.slug}
            />
          ))
        ) : (
          <div>NO articles</div>
        )}
      </div>
      <div className="flex justify-center items-center p-2 mt-5">
        <Pagination
          totalPost={articles?.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
