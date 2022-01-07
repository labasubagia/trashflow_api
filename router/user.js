const { Router } = require('express');
const UserController = require('../controller/user');
const User = require('../models/user');
const UserService = require('../service/user');

const userRouter = Router();

const controller = new UserController({
  userService: new UserService({
    userModel: User,
  }),
});

userRouter.post('/', ...controller.upsert());
userRouter.get('/', ...controller.getProfile());

module.exports = userRouter;
