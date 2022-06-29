require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { SERVER_PORT } = process.env;
const app = express();

const {
  navCanyons,
  canyonMain,
  postsCanyon,
  getPost,
} = require("./controllerGet");
const { createPost, createCanyon } = require("./controllerPost");
const { editPost } = require("./controllerPatch");
const { deletePost } = require("./controllerDelete");

app.use(express.json());
app.use(cors());

app.get("/api/v1/canyons", navCanyons);
app.get("/api/v1/canyon", canyonMain);
app.get("/api/v1/posts", postsCanyon);
app.get("/api/v1/post", getPost);

app.post("/api/v1/post", createPost);
app.post("/api/v1/canyon", createCanyon);

app.patch("/api/v1/post", editPost);

app.delete("/api/v1/post/:id", deletePost);

app.listen(SERVER_PORT, () => console.log(`Up on ${SERVER_PORT}`));
