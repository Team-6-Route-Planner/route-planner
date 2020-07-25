const db = require('../configs/mongo');
const User = db.collection(process.env.USER_COLLECTION_NAME);
const { ObjectId } = require('mongodb');

class UserModel {
    static signUp(newUser) {
        return User.insertOne(newUser);
    }
    static findOne(username) {
        return User.findOne({ "username": username });
    }
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