import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Typography } from "@material-tailwind/react";
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
      "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main night life in Barcelona.",
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

export default function Home() {
  const [articles, setArticles] = useState([]);
  const { publishArticles } = useSelector((state) => state.article);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!publishArticles || publishArticles.length === 0) {
      dispatch(getPublishArticles());
    }
  }, [dispatch, publishArticles]);

  useEffect(() => {
    const someArticles = publishArticles.slice(0, 3);
    setArticles(someArticles);
  }, [publishArticles]);

  return (
    <div className="w-full h-full">
      <HeroSection />
      <div className="w-full h-full bg-blue-gray-50 px-5">
        <Typography className="pt-14 text-xl md:text-4xl font-bold">
          Latest Articles
        </Typography>
        <hr className="max-w-full mt-2 bg-blue-gray-900 rounded-lg" />
        {publishArticles && publishArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mx-auto justify-items-center">
            {articles.map((article) => (
              <ArticleCard
                key={article._id}
                title={article.title}
                category={article.category.name}
                content={article.content}
                slug={article.slug}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
