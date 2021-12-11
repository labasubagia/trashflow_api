const { Schema, model, Types } = require('mongoose');
const User = require('./user');
const PostConfig = require('../config/post');

const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: User },
    title: { type: String, required: true },
    description: { type: String, default: null },
    image: { type: String, default: null },
    price: { type: Number, default: 0 },
    type: { type: String, enum: PostConfig.TYPES, default: null },
    categories: [{ type: String, enum: PostConfig.CATEGORIES, default: null }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Post = model('Post', schema);

module.exports = Post;
