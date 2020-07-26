const db = require("../configs/mongo");
const Route = db.collection(process.env.ROUTE_COLLECTION_NAME);
const { ObjectId } = require("mongodb");

class RouteModel {
  static create(newRoute) {
    return Route.insertOne(newRoute);
  }
  static update(id, updatedRoute) {
    return Route.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updatedRoute },
        { returnOriginal: false }
      );
  }
}
module.exports = RouteModel;