const { Router } = require('express');
const PostController = require('../controller/post');
const Post = require('../models/post');
const User = require('../models/user');
const Category = require('../models/category');
const PostService = require('../service/post');

const controller = new PostController({
  postService: new PostService({
    postModel: Post,
    userModel: User,
    categoryModel: Category,
  }),
});

const postRouter = Router();

postRouter.post('/', ...controller.create());
postRouter.post('/:id', ...controller.update());
postRouter.get('/', ...controller.getByFilter());
postRouter.get('/mine', ...controller.getAllMine());
postRouter.get('/:id', ...controller.getDetail());
postRouter.delete('/:id', ...controller.delete());

module.exports = postRouter;
