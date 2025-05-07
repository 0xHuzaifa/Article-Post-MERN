import express from "express";
import corsConfig from "./configs/cors.config.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errHandler.middleware.js";
// import cors from "cors";

export const app = express();

// middlewares
app.use(express.json({ limit: "16kb" })); // Limit the size of JSON payloads to 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Pars URL-encoded bodies
app.use(corsConfig());
// app.use(cors());
app.use(cookieParser());

// Error Handler
app.use(errorHandler);

// Routes
import authRoutes from "./routes/auth.routes.js";
import articleRoutes from "./routes/article.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/articles", articleRoutes);
