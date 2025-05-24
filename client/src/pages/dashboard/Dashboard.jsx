import {
  Typography,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/slices/categorySlice";
import {
  getMyArticles,
  getPublishArticles,
} from "../../redux/slices/articleSlice";

export default function Dashboard() {
  // Selectors for counts
  const {
    publishArticles,
    userArticles,
    userDraftArticles,
    isLoading: loadingArticles,
  } = useSelector((state) => state.article); // array
  const { categories, isLoading: loadingCategories } = useSelector(
    (state) => state.category
  ); // array
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(getAllCategories());
    }

    if (!publishArticles || publishArticles.length === 0) {
      dispatch(getPublishArticles());
    }

    if (!userArticles || userArticles.length === 0) {
      dispatch(getMyArticles());
    }

    if (!userDraftArticles || userDraftArticles.length === 0) {
      dispatch(getMyArticles());
    }
  }, [dispatch, categories, publishArticles]);

  return (
    <div className="w-full bg-blue-gray-50 min-h-screen">
      <div className="mx-auto px-4 md:px-8 py-3 md:py-7">
        <Typography variant="h1" className="mb-8">
          Dashboard
        </Typography>

        <div
          className={
            isAdmin
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-2"
              : "grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 py-2"
          }
        >
          {isAdmin &&
            (loadingArticles ? (
              <div className="mt-6 max-w-full animate-pulse">
                <Typography
                  as="div"
                  variant="h1"
                  className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
              </div>
            ) : (
              <Card className="mt-6 text-nowrap">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Published Articles
                  </Typography>
                  <Typography variant="h5" color="blue-gray">
                    {publishArticles?.length || 0}
                  </Typography>
                </CardBody>
              </Card>
            ))}

          {loadingArticles ? (
            <div className="mt-6 max-w-full animate-pulse">
              <Typography
                as="div"
                variant="h1"
                className="mb-4 h-3 w-56 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>

              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
            </div>
          ) : (
            <Card className="mt-6 text-nowrap">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  My Articles
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  {userArticles?.length || 0}
                </Typography>
              </CardBody>
            </Card>
          )}

          {loadingArticles ? (
            <div className="mt-6 max-w-full animate-pulse">
              <Typography
                as="div"
                variant="h1"
                className="mb-4 h-3 w-56 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>

              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
            </div>
          ) : (
            <Card className="mt-6 text-nowrap">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  My Draft Articles
                </Typography>
                <Typography variant="h5" color="blue-gray">
                  {userDraftArticles?.length || 0}
                </Typography>
              </CardBody>
            </Card>
          )}

          {/* Categories */}
          {isAdmin &&
            (loadingCategories ? (
              <div className="mt-6 max-w-full animate-pulse">
                <Typography
                  as="div"
                  variant="h1"
                  className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>

                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
              </div>
            ) : (
              <Card className="mt-6 text-nowrap">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Categories
                  </Typography>
                  <Typography variant="h5" color="blue-gray">
                    {categories?.length || 0}
                  </Typography>
                </CardBody>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
