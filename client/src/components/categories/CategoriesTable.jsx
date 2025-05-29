import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/slices/categorySlice";
import { Pagination } from "../common/Pagination";
import { CategoryModel } from "./CategoryModel";

const TABLE_HEAD = ["Name", "Description", "Created At", "Actions"];

export function CategoriesTable() {
  const { categories } = useSelector((state) => state.category); // array
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'edit' or 'delete'
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpen = (type, category) => {
    setModalType(type);
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(getAllCategories());
    }
  }, [dispatch]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentCategories = categories.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Card className="h-full w-full my-2">
        <CardBody className="overflow-x-auto p-0">
          <table className="mt-1 w-full min-w-max  table-auto text-left">
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
              {categories && categories.length > 0 ? (
                currentCategories.map((category, index) => {
                  const isLast = index === currentCategories.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {category.name}
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
                            {category.description}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(category.createdAt).toLocaleDateString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="space-x-2">
                          <Tooltip content="Delete" className="bg-red-400">
                            <IconButton
                              variant="text"
                              onClick={() => handleOpen("delete", category)}
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
                      No categories found.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>

        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 px-4 py-8">
          <Pagination
            totalPost={categories?.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </CardFooter>
      </Card>

      <CategoryModel
        handleOpen={handleClose}
        open={open}
        type={modalType}
        category={selectedCategory}
      />
    </>
  );
}
