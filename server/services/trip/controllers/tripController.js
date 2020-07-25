const Trip = require("../models/trip");
const shortestTrip = require("../helpers/shortestTrip");
class Controller {
  static async add(req, res, next) {
    const { addresses, userId } = req.body;
    let trip = await shortestTrip(addresses);
    Trip.create({
      routes: trip,
      userId: userId,
      status: false,
    })
      .then(async (data) => res.status(201).json(data.ops[0]))
      .catch(console.log);
  }
  static list(req, res, next) {
    Trip.findAll()
      .then((data) => res.status(200).json(data))
      .catch(console.log);
  }
  static listOneCurrent(req, res, next) {
    const { userId } = req.params;
    Trip.findCurrent(userId)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(console.log);
  }
  static edit(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;
    Trip.update(id, { status })
      .then((data) => res.status(200).json(data.value))
      .catch(console.log);
  }
  static showHistory(req, res, next) {
    const { userId } = req.params;
    Trip.findDones(userId)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(console.log);
  }
}
module.exports = Controller;
