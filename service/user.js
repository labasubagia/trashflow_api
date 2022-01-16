const { startSession } = require('mongoose');
const FileHelper = require('../helper/file');

class UserService {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  async upsert({
    email,
    name,
    image,
    phone,
    address,
    latitude,
    longitude,
    file,
    image_url,
  }) {
    const session = await startSession();
    try {
      session.startTransaction();
      if (file) {
        image = await FileHelper.uploadImage(file);
      } else if (image_url) {
        image = image_url;
      }
      const user = await this.userModel.findOneAndUpdate(
        { email },
        { email, name, image, phone, address, latitude, longitude },
        { upsert: true, new: true, session },
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
