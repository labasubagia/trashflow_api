const { Router } = require('express');
const multer = require('multer');
const PostController = require('../controller/post');
const Post = require('../models/post');
const User = require('../models/user');
const PostService = require('../service/post');

const upload = multer({ storage: multer.memoryStorage() });

const controller = new PostController({
  postService: new PostService({
    postModel: Post,
    userModel: User,
  }),
});

const postRouter = Router();

postRouter.post('/', upload.single('image'), (req, res, next) => {
  return controller.create(req, res, next);
});

postRouter.post('/:id', upload.single('image'), (req, res, next) => {
  return controller.update(req, res, next);
});

postRouter.get('/', (req, res, next) => {
  return controller.getByFilter(req, res, next);
});

postRouter.get('/:id', (req, res, next) => {
  return controller.getDetail(req, res, next);
});

postRouter.delete('/:id', (req, res, next) => {
  return controller.delete(req, res, next);
});

module.exports = postRouter;
