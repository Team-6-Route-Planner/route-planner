const Trip = require("../models/trip");
const Route = require('../models/route');
const User = require('../models/user');
const shortestTrip = require("../helpers/shortestTrip");
class Controller {
  static add(req, res, next) {
    const { addresses, userId } = req.body;
    let dataTrip;
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
        status: false,
        startedAt: new Date()
      })
    })
    .then(data => {
      dataTrip = data.ops[0];
      return User.findByPk(data.ops[0].userId)
    })
    .then(data => {
      Controller.sendPushNotification(data.deviceToken);
      res.status(200).json(dataTrip);
    })
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
  static getTripById(req, res, next) {
    const { tripId } = req.params;
    Trip.findOneTrip(tripId)
    .then(data => {
      if(!data) {
        res.status(404).json({ message: 'Data not found' });
      } else {
        res.status(200).json(data);
      }
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
  
  static async sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
}
module.exports = Controller;
