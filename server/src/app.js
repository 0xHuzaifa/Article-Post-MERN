import express from "express";
import corsConfig from "./configs/cors.config.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errHandler.middleware.js";
// import cors from "cors";

export const app = express();

// middlewares
app.use(express.json({ limit: "100kb" })); // Limit the size of JSON payloads to 16kb
app.use(express.urlencoded({ extended: true, limit: "100kb" })); // Pars URL-encoded bodies
app.use(corsConfig());
// app.use(cors());
app.use(cookieParser());

// Routes
import authRoutes from "./routes/auth.routes.js";
import articleRoutes from "./routes/article.routes.js";
import categoryRoutes from "./routes/category.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/article", articleRoutes);
app.use("/api/v1/category", categoryRoutes);

// Error Handler
app.use(errorHandler);
