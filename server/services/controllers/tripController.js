const Trip = require("../models/trip");
const Route = require('../models/route');
const shortestTrip = require("../helpers/shortestTrip");
class Controller {
  static add(req, res, next) {
    const { addresses, userId } = req.body;
    shortestTrip(addresses)
    .then(trip => {
      if(!Array.isArray(trip)){
        return res.status(400).json({ message: 'Wrong address'});
      } else {
        let promises = [];
        trip.forEach(el => {
          promises.push(Route.create({
            lat: el.lat,
            lng: el.lng,
            address: el.address,
            status: 'ongoing',
            arrivedAt: null
          }))
        })
        return Promise.all(promises)
      }
    })
    .then(data => {
      let routes = [];
      data.forEach(el => {
        routes.push(el.ops[0]);
      })
      return Trip.create({
        routes,
        userId,
        status: false
      })
    })
    .then(data => res.status(201).json(data.ops[0]))
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
    Trip.update(id, { status: status === 'true' })
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
