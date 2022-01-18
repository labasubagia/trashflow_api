const { Schema, model } = require('mongoose');

const schema = new Schema(
  { name: { type: String, required: true } },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Category = model('Category', schema);

module.exports = Category;
