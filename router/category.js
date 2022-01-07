const { Router } = require('express');
const CategoryController = require('../controller/category');
const Category = require('../models/category');
const CategoryService = require('../service/category');

const categoryRouter = Router();

const controller = new CategoryController({
  categoryService: new CategoryService({
    categoryModel: Category,
  }),
});

categoryRouter.post('/', ...controller.upsert());
categoryRouter.get('/', ...controller.getByFilter());
categoryRouter.delete('/:id', ...controller.delete());

module.exports = categoryRouter;
