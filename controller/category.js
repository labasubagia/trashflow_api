class CategoryController {
  constructor({ categoryService }) {
    this.categoryService = categoryService;
  }

  upsert() {
    return [this.upsertHandler()];
  }

  upsertHandler() {
    return async (req, res, next) => {
      try {
        const user = await this.categoryService.upsert(req.body);
        return res.json({
          success: true,
          data: user,
          message: 'save category success',
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
      const data = await this.categoryService.getByFilter(req.body);
      return res.json({
        success: true,
        data,
        message: '',
      });
    };
  }

  delete() {
    return [this.deleteHandler()];
  }

  deleteHandler() {
    return async (req, res) => {
      const post = await this.categoryService.delete({ id: req.params.id });
      return res.status(post ? 200 : 404).json({
        success: !!post,
        data: post,
        message: post ? 'delete success' : '',
      });
    };
  }
}

module.exports = CategoryController;
