const express = require("express");
const connect = require("./configs/db");
const newsController = require("./controllers/news.conntroller");

const app = express();
app.use(express.json());

app.use("/news", newsController);

app.listen(8080, async function () {
  try {
    await connect();
    console.log("listening on port 8080");
  } catch (error) {
    console.log("error: ", error);
  }
});
