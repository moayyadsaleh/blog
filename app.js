import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from 'lodash';
import axios from "axios";

const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
const aboutContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here";
const contactContent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get('/', (req, res) => {
    res.render('home', { homeStartingContent: homeStartingContent, posts: posts });
});

app.get('/about', (req, res) => {
    res.render('about', {aboutContent: aboutContent,
    posts:posts});
});

app.get('/contact', (req, res) => {
    res.render('contact', {contactContent: contactContent });
});

app.get('/compose', (req, res) => {
    res.render('compose.ejs', {contactContent: contactContent });
});
app.post('/compose', (req, res) => {
    const post = {
        title: req.body.userInput,
        content: req.body.userCompose
    };
    posts.push(post);
    res.redirect("/")
});


app.get("/posts/:postName", (req, res) => {
    const requestedTitle = _.toLower(req.params.postName) ;
    posts.forEach((post) => {
      const storedTitle = _.toLower(post.title); // Declare 'storedTitle' using 'const'
  
      if ((storedTitle) === (requestedTitle)) {
        res.render("post.ejs", {title:post.title, content:post.content});
        // Your code to handle the matched post, such as rendering or sending it as a response
        return; // Exit the forEach loop once a match is found
      }
    });
  });

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
