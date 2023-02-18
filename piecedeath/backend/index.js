import express from "express";
import router from "./routes/userRoutes.js";
import cors from "cors";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => console.log("sasageyo"));
