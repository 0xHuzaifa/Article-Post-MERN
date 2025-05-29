import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, TagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SquarePen, FolderPen, LayoutList } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slices/authSlice";

export function Sidebar() {
  const { isAdmin } = useSelector((state) => state.auth);
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
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="fixed bottom-10 left-5 z-50">
        <IconButton
          variant="filled"
          size="lg"
          className="bg-blue-gray-300 rounded-full"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          {isDrawerOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Article Post
            </Typography>
          </div>

          <List>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem
              onClick={() => {
                navigate("/dashboard");
                closeDrawer();
              }}
            >
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>

            {isAdmin && (
              <ListItem
                onClick={() => {
                  navigate("/all-articles");
                  closeDrawer();
                }}
              >
                <ListItemPrefix>
                  <FolderPen className="h-5 w-5" />
                </ListItemPrefix>
                Articles
                <ListItemSuffix>
                  <Chip
                    value={publishArticles?.length || 0}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            )}

            <ListItem
              onClick={() => {
                navigate("/dashboard/my-articles");
                closeDrawer();
              }}
            >
              <ListItemPrefix>
                <SquarePen className="h-5 w-5" />
              </ListItemPrefix>
              My Articles
              <ListItemSuffix>
                <Chip
                  value={userArticles?.length + userDraftArticles?.length || 0}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>

            <ListItem
              onClick={() => {
                navigate("/articles");
                closeDrawer();
              }}
            >
              <ListItemPrefix>
                <LayoutList className="h-5 w-5" />
              </ListItemPrefix>
              Articles List Page
            </ListItem>

            {isAdmin && (
              <ListItem
                onClick={() => {
                  navigate("/dashboard/categories");
                  closeDrawer();
                }}
              >
                <ListItemPrefix>
                  <TagIcon className="h-5 w-5" />
                </ListItemPrefix>
                Categories
                <ListItemSuffix>
                  <Chip
                    value={categories?.length || 0}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            )}

            <hr className="my-2 border-blue-gray-50" />

            <ListItem
              onClick={() => {
                navigate("/dashboard/profile");
                closeDrawer();
              }}
            >
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>

            <ListItem onClick={handleLogout}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>

          <div className="fixed bottom-10 left-5 sm:hidden">
            <IconButton
              variant="filled"
              size="lg"
              className="bg-blue-gray-300 rounded-full"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              {isDrawerOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </IconButton>
          </div>
        </Card>
      </Drawer>
    </>
  );
}
