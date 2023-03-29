import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { createServer } from "http";
import { config } from "dotenv";
import cors from "cors";

import { router } from "#shared/router.js";
import { errorHandle } from "#middlewares/error/errorHandle.js";
import { internalErro } from "#middlewares/error/internalErro.js";

const app = express();

app.use(cors());

config(".env");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_URL);

app.use(express.json());
app.use(router);

app.use(errorHandle);
app.use(internalErro);

app.listen(process.env.PORT || 3000, () => console.log("ok ✅"));



https://www.workana.com/job/quero-colocar-alguns-dados-estruturados-no-site?ref=projects_5