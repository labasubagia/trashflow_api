const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    image: { type: String, default: null },
    address: { type: String, default: null },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const User = model('User', schema);

module.exports = User;
