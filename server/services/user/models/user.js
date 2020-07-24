const { getDatabase } = require('../configs/mongo');
const User = getDatabase().collection(process.env.COLLECTION_NAME);
const { ObjectId } = require('mongodb');

class UserModel {
    static signUp(newUser) {
        return User.insertOne(newUser);
    }
    static findOne(username) {
        return User.findOne({ "username": username });
    }
}
module.exports = UserModel;