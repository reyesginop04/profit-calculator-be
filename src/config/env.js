import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/expressdb",
  JWT_SECRET: process.env.JWT_SECRET || "your_secret_key",
};
