import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./src/routes/router.js";
import cors from "cors";

dotenv.config();

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());
app.use("api/FAQ", router);

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
    console.log("Try /api/FAQ route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
