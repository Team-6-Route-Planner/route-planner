const Trip = require("../models/trip");
const shortestTrip = require("../helpers/shortestTrip");
class Controller {
  static add(req, res, next) {
    const { addresses, userId } = req.body;
    Trip.create({
      addresses,
      userId: Number(userId),
      status: false,
    })
      .then((data) => res.status(200).json(data))
      .catch(console.log);
  }
  static list(req, res, next) {
    Trip.findAll()
      .then((data) => res.status(200).json(data))
      .catch(console.log);
  }
  static listOneCurrent(req, res, next) {
    const { userId } = req.params;
    Trip.findCurrent(Number(userId))
      .then((data) => res.status(200).json(data))
      .catch(console.log);
  }
  static edit(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;
    Trip.update(id, { status })
      .then((data) => res.status(200).json(data))
      .catch(console.log);
  }
  static getShortestTrip(req, res, next) {
    const { tripId } = req.params;
    console.log(req.params.tripId);
    Trip.findTrip(tripId)
      .then(async (data) => {
        let trip = await shortestTrip(data.addresses);
        console.log(trip);
        res.status(200).json(trip);
      })
      .catch(console.log);
  }
}
module.exports = Controller;
