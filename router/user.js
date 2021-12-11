const { Router } = require('express');
const multer = require('multer');
const UserController = require('../controller/user');
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');
const UserService = require('../service/user');

const upload = multer({ storage: multer.memoryStorage() });

const controller = new UserController({
  userService: new UserService({
    userModel: User,
  }),
});

const userRouter = Router();

userRouter.post('/', upload.single('image'), (req, res, next) => {
  return controller.create(req, res, next);
});

userRouter.get('/', authMiddleware({ userModel: User }), (req, res) => {
  return res.json({ success: true, data: req.user, message: '' });
});

module.exports = userRouter;
