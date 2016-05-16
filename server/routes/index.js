var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development']);

router.get('/api/v1/posts', function(req, res, next) {
  var results = {};
  knex('posts')
  .then(function(posts){
    results.posts = posts;
  })
  .then(function () {
    knex('comments')
    .then(function(comments) {
      results.comments = comments;
      for (var i = 0; i < results.posts.length; i++) {
        results.posts[i].comments = [];
        results.posts[i].showComments = false;
        for (var j = 0; j < results.comments.length; j++) {
          if (results.posts[i].id === results.comments[j].post_id) {
            results.posts[i].comments.push(results.comments[j])
          }
        }
      }
      delete results.comments;
      res.json(results);
    })
  })
});

router.post('/api/v1/posts', function(req, res, next) {
  var data = {
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    description: req.body.description
  }
  knex('posts').insert(data).returning('*').then(function(posts){
    console.log(posts);
    res.json(posts[0]);
  })
});

router.post('/api/v1/posts/upvote', function(req, res, next) {
  knex('posts')
  .where({id: req.body.id})
  .update({score: req.body.score+1})
  .returning('*')
  .then(function(post){
    res.json(post);
  })
});

router.post('/api/v1/posts/downvote', function(req, res, next) {
  knex('posts')
  .where({id: req.body.id})
  .update({score: req.body.score-1})
  .returning('*')
  .then(function(post){
    res.json(post);
  })
});

module.exports = router;
