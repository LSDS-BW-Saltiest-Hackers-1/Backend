const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// ADD MIDDLEWARE REQUIRE IN THIS LINE!
const usersRouter = require("../users/users-router");
const commentsRouter = require("../comments/comments-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/api/comments", /*ADD AUTHENTICATOR HERE */ commentsRouter);


module.exports = server;
