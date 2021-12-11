const { startSession } = require('mongoose');
const FileHelper = require('../helper/file');

class UserService {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  async upsert({ email, image, phone, address, latitude, longitude, file }) {
    const session = await startSession();
    try {
      session.startTransaction();
      if (file) {
        image = await FileHelper.uploadImage(file);
      }
      const user = this.userModel.findOneAndUpdate(
        { email },
        { email, image, phone, address, latitude, longitude },
        { upsert: true, new: true },
      );
      await session.commitTransaction();
      session.endSession();
      return user;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

module.exports = UserService;
