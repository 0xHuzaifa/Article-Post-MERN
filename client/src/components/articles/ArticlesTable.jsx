import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";
import { Pagination } from "../common/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { ArticleModel } from "./ArticleModel";
import { View, ViewIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TABS = [
  {
    label: "Publish",
    value: "publish",
  },
  {
    label: "Draft",
    value: "draft",
  },
];

const TABLE_HEAD = ["Tittle", "Category", "Status", "Publish Date", "Actions"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];

export function ArticlesTable({ articles, isLoading, userArticles = false }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'edit' or 'delete'
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleOpen = (type, article) => {
    setModalType(type);
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentArticles = articles.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <Card className="h-full w-full my-2">
        <CardBody className="overflow-scroll p-0">
          <table className="mt-1 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <>
                  {[...Array(5)].map((_, idx) => (
                    <tr key={idx} className="h-16">
                      <td colSpan={TABLE_HEAD.length} className="p-2">
                        <div className="flex items-center gap-6">
                          {/* Title skeleton */}
                          <div className="w-32 h-4 bg-blue-gray-100 rounded animate-pulse"></div>
                          {/* Author skeleton */}
                          <div className="w-20 h-4 bg-blue-gray-100 rounded animate-pulse"></div>
                          {/* Category skeleton */}
                          <div className="w-16 h-4 bg-blue-gray-100 rounded animate-pulse"></div>
                          {/* Status skeleton */}
                          <div className="w-16 h-4 bg-blue-gray-100 rounded animate-pulse"></div>
                          {/* Date skeleton */}
                          <div className="w-20 h-4 bg-blue-gray-100 rounded animate-pulse"></div>
                          {/* Actions skeleton */}
                          <div className="flex gap-2">
                            <div className="w-8 h-8 bg-blue-gray-100 rounded-full animate-pulse"></div>
                            <div className="w-8 h-8 bg-blue-gray-100 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : articles && articles.length > 0 ? (
                currentArticles.map((article, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={article._id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {article.title}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {article.author.username}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {article.category.name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={article.isPublished ? "Published" : "Draft"}
                            color={article.isPublished ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(article.createdAt).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="space-x-2">
                          {userArticles ? (
                            <Tooltip content="Edit">
                              <IconButton
                                variant="text"
                                onClick={() => handleOpen("edit", article)}
                              >
                                <PencilIcon className="h-4 w-4 text-blue-500" />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip content="View">
                              <a
                                href={`/articles/${article.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <IconButton variant="text">
                                  <View className="h-4 w-4 text-black/80" />
                                </IconButton>
                              </a>
                            </Tooltip>
                          )}

                          <Tooltip content="Delete" className="bg-red-400">
                            <IconButton
                              variant="text"
                              onClick={() => handleOpen("delete", article)}
                            >
                              <TrashIcon className="h-4 w-4 text-red-500" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="h-52">
                  <td colSpan={TABLE_HEAD.length} className="p-6 text-center">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="font-medium opacity-60"
                    >
                      No articles found.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 px-4 py-8">
          <Pagination
            totalPost={articles?.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </CardFooter>
      </Card>

      <ArticleModel
        handleOpen={handleClose}
        open={open}
        type={modalType}
        article={selectedArticle}
      />
    </>
  );
}
