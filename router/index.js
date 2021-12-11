const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');
const postRouter = require('./post');
const userRouter = require('./user');

const router = Router();

router.get('/', (_, res) => {
  return res.json({ success: true, data: null, message: 'Server is active' });
});

router.use('/post', authMiddleware({ userModel: User }), postRouter);
router.use('/user', userRouter);

router.use((_, res) => {
  return res
    .status(404)
    .json({ success: false, data: null, message: 'Page Not Found' });
});

module.exports = router;
