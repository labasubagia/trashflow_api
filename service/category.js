const { startSession, Types } = require('mongoose');
const _ = require('lodash');

class CategoryService {
  constructor({ categoryModel }) {
    this.categoryModel = categoryModel;
  }

  async upsert({ name }) {
    const session = await startSession();
    try {
      session.startTransaction();
      const category = await this.categoryModel.findOneAndUpdate(
        { name },
        { name },
        { upsert: true, new: true, session },
      );
      await session.commitTransaction();
      session.endSession();
      return category;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async getByFilter({ id, name } = {}) {
    const filter = _.pickBy(
      {
        _id: id ? Types.ObjectId(id) : undefined,
        name: name ? new RegExp(name, 'i') : undefined,
      },
      _.identity,
    );
    const data = await this.categoryModel.find(filter);
    return data;
  }

  async delete({ id }) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}

module.exports = CategoryService;
