const { getDatabase } = require('../configs/mongo');
const Trip = getDatabase().collection(process.env.COLLECTION_NAME);
const { ObjectId } = require('mongodb');

class TripModel {
    static create(newTrip) {
        return Trip.insertOne(newTrip);
    }
    static findAll() {
        return Trip.find().toArray();
    }
    static findCurrent(id) {
        return Trip.findOne({ "userId": id, status: false });
    }
    static update(id, updatedTrip) {
        return Trip.findOneAndUpdate(
            { "_id": ObjectId(id) },
            { $set: updatedTrip },
            { returnOriginal: false }
        )
    }
}
module.exports = TripModel;