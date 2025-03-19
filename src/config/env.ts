import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 8080,
  mongoURI: process.env.MONGO_URI || 'noENV',
  jwtSecret: process.env.JWT_SECRET || 'noENV',
  corsOrigin: process.env.CORS_ORIGIN || 'noENV',
};
