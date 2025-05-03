"use client";

import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  MobileNav,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map((item) => (
        <Typography
          key={item.label}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link
            to={item.href}
            className="flex items-center hover:text-blue-500 transition-colors"
          >
            {item.label}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full shadow-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between rounded-[30px] px-4 py-2 lg:px-8 lg:py-4 shadow-lg">
        <Typography
          className="mr-4 cursor-pointer py-1.5 font-medium text-blue-gray-900"
          variant="h5"
          onClick={() => navigate("/")}
        >
          Article Post
        </Typography>
        <div className="flex items-center gap-4">
          {/* navbar list */}
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {/* login button */}
            <Button
              variant="text"
              size="sm"
              className="hidden lg:inline-block"
              onClick={() => navigate("/login")}
            >
              <span>Log In</span>
            </Button>
            {/* signup button */}
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={() => navigate("/signup")}
            >
              <span>Sign in</span>
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button
            fullWidth
            variant="text"
            size="sm"
            onClick={() => navigate("/login")}
          >
            <span>Log In</span>
          </Button>
          <Button
            fullWidth
            variant="gradient"
            size="sm"
            onClick={() => navigate("/signup")}
          >
            <span>Sign in</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}
