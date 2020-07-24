const db = require("../configs/mongo");
const Trip = db.collection(process.env.COLLECTION_NAME);
const { ObjectId } = require("mongodb");

class TripModel {
  static create(newTrip) {
    return Trip.insertOne(newTrip);
  }
  static findAll() {
    return Trip.find().toArray();
  }
  static findCurrent(id) {
    return Trip.findOne({ userId: id, status: false });
  }
  static findTrip(id) {
    return Trip.findOne({ _id: ObjectId(id) });
  }
  static update(id, updatedTrip) {
    return Trip.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updatedTrip },
      { returnOriginal: false }
    );
  }
}
module.exports = TripModel;