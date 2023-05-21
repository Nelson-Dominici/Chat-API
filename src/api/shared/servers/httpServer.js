import express from "express";
import "express-async-errors";
import mongoose from "mongoose";

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "#config/swagger/swagger.json" assert {type: "json"};

import { config } from "dotenv";

import cors from "cors";
import http from "http";

import { Server } from "socket.io";
import { router } from "#shared/router.js";

import { errorHandle } from "#middlewares/error/errorHandle.js";
import { pageNotFound } from "#middlewares/error/pageNotFound.js";

import { errors } from "celebrate";

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(cors());

config();

mongoose.connect(process.env.DATABASE_URL);

app.use(express.json());

app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));

app.use(errors());
app.use(errorHandle);
app.use(pageNotFound);

export { httpServer, io };
