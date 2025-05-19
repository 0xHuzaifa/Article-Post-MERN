import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Breadcrumbs,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSpecificArticle } from "../../redux/slices/articleSlice";
import { Spinner } from "@material-tailwind/react";

export default function ArticleDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const slug = param.article

  const { isLoading } = useSelector((state) => state.article);

  const [article, setArticle] = useState();

  useEffect(() => {
    async function fetchData() {
      console.log("param", param.article);
      const result = await dispatch(getSpecificArticle(slug));
      if (result.meta.requestStatus === "fulfilled") {
        setArticle(result.payload);
      } else {
        navigate("/articles");
      }
    }
    fetchData();
  }, [slug, dispatch]);

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-blue-gray-50 flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />;
      </div>
    );
  }

  return (
    <div className="max-w-full px-4 pt-24 pb-8 bg-blue-gray-50">
      {/* Breadcrumbs navigation */}
      <Breadcrumbs className="mb-6 bg-white rounded">
        <a href="#" className="opacity-60">
          Home
        </a>
        <a href="#" className="opacity-60">
          Blog
        </a>
        <a href="#">{article?.category?.name}</a>
      </Breadcrumbs>

      <Card className="overflow-hidden">
        {/* Article Header */}
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 p-6 pb-0"
        >
          {/* Category and metadata */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
            <Chip
              value={article?.category?.name}
              color="blue"
              size="sm"
              className="w-fit"
            />
            <div className="flex items-center gap-2 text-gray-600">
              <Typography variant="small">
                {new Date(article?.createdAt).toLocaleDateString()}
              </Typography>
              <span>•</span>
              {/* <Typography variant="small">{article.readTime}</Typography> */}
            </div>
          </div>

          {/* Article Title */}
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-3xl md:text-4xl lg:text-5xl"
          >
            {article?.title}
          </Typography>

          {/* Author information (top placement option) */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <Typography variant="h6">{article?.author?.username}</Typography>
              {/* <Typography variant="small" color="gray" className="font-normal">
                {article?.author.email}
              </Typography> */}
            </div>
          </div>
        </CardHeader>

        {/* Article Content */}
        <CardBody className="p-6">
          {/* Main content paragraphs */}
          <article className="prose max-w-none break-words whitespace-pre-wrap overflow-x-auto">
            <Typography
              key={article?._id}
              variant="paragraph"
              className="mb-4 text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: article?.content }}
            />
          </article>
        </CardBody>
      </Card>
    </div>
  );
}
