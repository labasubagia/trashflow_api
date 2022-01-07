const { startSession, Types } = require('mongoose');
const _ = require('lodash');
const FileHelper = require('../helper/file');

class PostService {
  constructor({ postModel, userModel, categoryModel }) {
    this.postModel = postModel;
    this.userModel = userModel;
    this.categoryModel = categoryModel;
  }

  async upsert({
    id,
    user_id,
    title,
    description,
    image,
    price,
    type,
    category_ids,
    file,
  }) {
    const session = await startSession();
    try {
      session.startTransaction();
      if (file) {
        image = await FileHelper.uploadImage(file);
      }
      const payload = _.pickBy(
        { user_id, title, description, image, price, type, category_ids },
        _.identity,
      );
      const post = await this.postModel.findOneAndUpdate(
        { _id: id ? Types.ObjectId(id) : Types.ObjectId() },
        payload,
        { upsert: true, new: true, session },
      );
      await session.commitTransaction();
      session.endSession();
      return post;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async getByFilter({ id, user_id, title, type, category_ids = [] } = {}) {
    const filter = _.pickBy(
      {
        _id: id ? Types.ObjectId(id) : undefined,
        user_id: user_id ? Types.ObjectId(user_id) : undefined,
        title: title ? new RegExp(title, 'i') : undefined,
        category_ids: category_ids.length
          ? { $in: category_ids.map(Types.ObjectId) }
          : undefined,
        type,
      },
      _.identity,
    );
    const pipeline = [
      { $match: filter },
      {
        $lookup: {
          from: this.userModel.collection.name,
          let: { user_id: '$user_id' },
          pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$user_id'] } } }],
          as: 'author',
        },
      },
      {
        $lookup: {
          from: this.categoryModel.collection.name,
          let: { category_ids: '$category_ids' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$category_ids'] } } },
          ],
          as: 'categories',
        },
      },
      { $addFields: { author: { $arrayElemAt: ['$author', 0] } } },
      { $sort: { updated_at: 1, name: 1 } },
    ];
    // return pipeline;
    const data = await this.postModel.aggregate(pipeline).allowDiskUse(true);
    return data;
  }

  async delete({ id }) {
    return this.postModel.findByIdAndDelete(id);
  }
}

module.exports = PostService;
