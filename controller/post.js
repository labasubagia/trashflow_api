class PostController {
  constructor({ postService }) {
    this.postService = postService;
  }

  async create(req, res, next) {
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
  }

  async update(req, res, next) {
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
  }

  async getByFilter(req, res) {
    return res.json({
      success: true,
      data: await this.postService.getByFilter(req.body),
      message: '',
    });
  }

  async getDetail(req, res) {
    const posts = await this.postService.getByFilter({ id: req.params.id });
    const post = posts.length ? posts[0] : null;
    return res.status(post ? 200 : 404).json({
      success: !!post,
      data: post,
      message: post ? '' : 'post not found',
    });
  }

  async delete(req, res) {
    const post = await this.postService.delete({ id: req.params.id });
    return res.status(post ? 200 : 404).json({
      success: !!post,
      data: post,
      message: post ? 'delete success' : '',
    });
  }
}

module.exports = PostController;
