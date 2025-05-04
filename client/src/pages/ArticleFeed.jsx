import React, { useEffect, useState } from "react";
import { ArticleCard } from "@/components/common/ArticleCard";

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

  useEffect(() => {
    setArticles(AllArticles);
  }, []);

  return (
    <div className="w-full bg-blue-gray-50 min-h-screen pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mx-auto justify-items-center">
        {articles &&
          articles?.length > 0 &&
          articles.map((article) => (
            <ArticleCard
              key={article.title}
              title={article.title}
              category={article.category}
              content={article.description}
            />
          ))}
      </div>
    </div>
  );
}
