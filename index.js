import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

app.get('/', (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/upload", (req, res) => {
 res.render("upload.ejs")  
});

app.post("/create", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  if (title && content) {
    posts.push({ title, content });
    res.redirect('/');
  } else {
    res.send('Title and content are required!');
  }
});

app.post("/delete/:index", (req, res) => {
  const index = parseInt(req.params.index);
  console.log(index);
  if (index >= 0 && index < posts.length) {
    posts.splice(index, 1);
  }
  res.redirect('/');
});


app.get("/update/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const result = posts[index];
  const title = result.title;
  const content = result.content;
  res.render("update.ejs",{title:title, content:content});
  if (index >= 0 && index < posts.length) {
    posts.splice(index, 1);
  }
});




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});