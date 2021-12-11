class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  async create(req, res, next) {
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
  }
}

module.exports = UserController;
