import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

app.get("/", (req, res) => {
  res.render("./index.ejs", { posts });
});

let count = 1;

app.post("/submit", (req, res) => {
  const d = new Date();
  const post = {
    id: count,
    title: req.body["title"],
    description: req.body["description"],
    content: req.body["content"],
    date: `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`,
    time: `${d.getHours()}:${d.getMinutes()}`,
  };

  if (post.title !== "" && post.content !== "") {
    count++;
    posts.push(post);
  }

  res.render("index.ejs", { posts });
});

app.get("/edit/:id", (req, res) => {
  const requestedId = req.params.id;

  const post = posts.find((p) => p.id == requestedId); // use == to allow string/number match

  res.render("index.ejs", { posts, editPost: post });
});

app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const index = posts.findIndex((p) => p.id == id);

  posts[index].title = req.body.title;
  posts[index].description = req.body.description;
  posts[index].content = req.body.content;

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const index = posts.findIndex((p) => p.id == id);
  posts.splice(index, 1);

  res.redirect("/");
});

app.get("/view/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find((p) => p.id == id);

  res.render("index.ejs", { posts, viewPost: post });
});

app.listen(port, (req, res) => {
  console.log("Server running");
});

let posts = [];
