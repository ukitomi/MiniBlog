const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

// database connection
mongoose.connect('mongodb+srv://user:1LGh5sxEniDouIZ0@cluster0-sejat.mongodb.net/node-angular?retryWrites=true')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

// return a valid express middleware for parsing json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({encoded: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'Get, POST, PATCH, DELETE, OPTIONS');
  next();
});
// PW: 1LGh5sxEniDouIZ0
app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  // 201: everything is ok
  res.status(201).json({
    message: 'Post added successfully'
  });
});

// get request
app.get('/api/posts',(req, res, next) => {
  const posts = [
    {
      id: 'fadf122323',
      title: 'first server side post',
      content: 'this is coming from the serevr'
    },
    {
      id: 'dasdasdas',
      title: 'second serevre side post',
      content: "this is coming from serevr"
    }
  ];
  res.status(200).json({
    message: 'Posts fetched succesful',
    posts: posts
  });
});

module.exports = app;
