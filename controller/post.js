const multer = require('multer');

class PostController {
  constructor({ postService }) {
    this.postService = postService;
    this.upload = multer({ storage: multer.memoryStorage() });
  }

  create() {
    return [this.upload.single('image'), this.createHandler()];
  }

  createHandler() {
    return async (req, res, next) => {
      try {
        const user = await this.postService.upsert({
          ...req.body,
          user_id: req.user.id,
          file: req.file,
        });
        return res.json({
          success: true,
          data: user,
          message: 'save post success',
        });
      } catch (err) {
        err.statusCode = 400;
        return next(err);
      }
    };
  }

  update() {
    return [this.upload.single('image'), this.updateHandler()];
  }

  updateHandler() {
    return async (req, res, next) => {
      try {
        const user = await this.postService.upsert({
          ...req.body,
          user_id: req.user.id,
          file: req.file,
          id: req.params.id,
        });
        return res.json({
          success: true,
          data: user,
          message: 'save post success',
        });
      } catch (err) {
        err.statusCode = 400;
        return next(err);
      }
    };
  }

  getByFilter() {
    return [this.getByFilterHandler()];
  }

  getByFilterHandler() {
    return async (req, res) => {
      return res.json({
        success: true,
        data: await this.postService.getByFilter(req.body),
        message: '',
      });
    };
  }

  getAllMine() {
    return [this.getAllMineHandler()];
  }

  getAllMineHandler() {
    return async (req, res) => {
      return res.json({
        success: true,
        data: await this.postService.getByFilter({
          ...req.body,
          user_id: req.user.id,
        }),
        message: '',
      });
    };
  }

  getDetail() {
    return [this.getDetailHandler()];
  }

  getDetailHandler() {
    return async (req, res) => {
      const posts = await this.postService.getByFilter({ id: req.params.id });
      const post = posts.length ? posts[0] : null;
      return res.status(post ? 200 : 404).json({
        success: !!post,
        data: post,
        message: post ? '' : 'post not found',
      });
    };
  }

  delete() {
    return [this.deleteHandler()];
  }

  deleteHandler() {
    return async (req, res) => {
      const post = await this.postService.delete({ id: req.params.id });
      return res.status(post ? 200 : 404).json({
        success: !!post,
        data: post,
        message: post ? 'delete success' : '',
      });
    };
  }
}

module.exports = PostController;
