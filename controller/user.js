const multer = require('multer');
const authMiddleware = require('../middleware/auth');

class UserController {
  constructor({ userService }) {
    this.userService = userService;
    this.upload = multer({ storage: multer.memoryStorage() });
  }

  upsert() {
    return [this.upload.single('image'), this.upsertHandler()];
  }

  upsertHandler() {
    return async (req, res, next) => {
      try {
        const user = await this.userService.upsert({
          ...req.body,
          file: req.file,
        });
        return res.json({
          success: true,
          data: user,
          message: 'save user success',
        });
      } catch (err) {
        err.statusCode = 400;
        return next(err);
      }
    };
  }

  getProfile() {
    return [
      authMiddleware({ userModel: this.userService.userModel }),
      this.getProfileHandler(),
    ];
  }

  getProfileHandler() {
    return async (req, res) => {
      return res.json({ success: true, data: req.user, message: '' });
    };
  }
}

module.exports = UserController;
