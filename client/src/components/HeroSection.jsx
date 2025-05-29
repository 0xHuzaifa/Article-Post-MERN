import { Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { isLogin } = useSelector((state) => state.auth);

  return (
    <section className="w-full relative bg-gray-900 text-white">
      {/* Hero container */}
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow text */}
          <Chip
            value="Discover New Perspective"
            className="rounded-full inline-block capitalize bg-blue-600 px-3 py-1 text-xs font-semibold mb-4"
          />

          {/* Main heading */}

          <Typography className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Insights and Stories That Inspire
          </Typography>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore thought-provoking articles from writers around the world.
            Expand your knowledge and discover new ideas.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/articles"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Start Reading
            </Link>
            {!isLogin && (
              <Link
                to="/signup"
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white font-medium rounded-lg border border-white/20 transition-colors duration-200"
              >
                SignUp
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
