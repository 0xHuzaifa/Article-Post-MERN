import cors from "cors";

const corsConfig = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigin = ["http://localhost:3000", "http://localhost:5173"];
      if (!origin || allowedOrigin.indexOf(origin) !== -1) {
        callback(null, true); // allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // block the request
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc)
  });
};

export default corsConfig;
