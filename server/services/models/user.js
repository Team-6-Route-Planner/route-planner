const db = require("../configs/mongo");
const User = db.collection(process.env.USER_COLLECTION_NAME);
const { ObjectId } = require("mongodb");

class UserModel {
  static signUp(newUser) {
    return User.insertOne(newUser);
  }
  static findOne(id) {
    return User.findOne({ _id: ObjectId(id) });
  }
  // static findByPk(id) {
  //     return User.findOne({ _id: ObjectId(id) });
  // }
  static findAll() {
    return User.find().toArray();
  }
  static update(id, updatedUser) {
    return User.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updatedUser },
      { returnOriginal: false }
    );
  }
}
module.exports = UserModel;
