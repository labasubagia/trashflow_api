const { startSession, Types } = require('mongoose');
const _ = require('lodash');
const FileHelper = require('../helper/file');

class PostService {
  constructor({ postModel, userModel }) {
    this.postModel = postModel;
    this.userModel = userModel;
  }

  async upsert({
    id,
    user_id,
    title,
    description,
    image,
    price,
    type,
    categories,
    file,
  }) {
    const session = await startSession();
    try {
      session.startTransaction();
      if (file) {
        image = await FileHelper.uploadImage(file);
      }
      const payload = _.pickBy(
        { user_id, title, description, image, price, type, categories },
        _.identity,
      );
      const post = await this.postModel.findOneAndUpdate(
        { _id: id ? Types.ObjectId(id) : Types.ObjectId() },
        payload,
        { upsert: true, new: true },
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

  async getByFilter({ id, user_id, title, type, categories } = {}) {
    const filter = _.pickBy(
      {
        _id: id ? Types.ObjectId(id) : undefined,
        user_id: user_id ? Types.ObjectId(user_id) : undefined,
        title: title ? new RegExp(title, 'i') : undefined,
        categories: categories ? { $in: categories } : undefined,
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
      { $addFields: { author: { $arrayElemAt: ['$author', 0] } } },
      { $sort: { updated_at: 1, name: 1 } },
    ];
    const data = await this.postModel.aggregate(pipeline).allowDiskUse(true);
    return data;
  }

  async delete({ id }) {
    return this.postModel.findByIdAndDelete(id);
  }
}

module.exports = PostService;
