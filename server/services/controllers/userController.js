const User = require("../models/user");
const Trip = require("../models/trip");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class Controller {
  static register(req, res, next) {
    const { username } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    User.findOne(username)
      .then((data) => {
        if (data) {
          return res.status(400).json({ message: "Username exists" });
        } else {
          return User.signUp({ username, password });
        }
      })
      .then((data) => {
        res.status(201).json(data.ops[0]);
      })
      .catch(console.log);
  }
  static login(req, res, next) {
    const { username, password } = req.body;
    User.findOne(username)
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "User not found" });
        } else if (!bcrypt.compareSync(password, data.password)) {
          res.status(400).json({ message: "Wrong password" });
        } else {
          const token = jwt.sign(
            {
              _id: data._id,
              username: data.username,
            },
            process.env.JWT
          );
          res.status(200).json({
            message: "Login success",
            _id: data._id,
            username: data.username,
            token,
          });
        }
      })
      .catch(console.log);
  }
  static listAvailable(req, res, next) {
    let users = [];
    User.findAll()
      .then((data) => {
        users = data;
        let promises = [];
        data.forEach((user) => {
          promises.push(Trip.findCurrent(String(user._id)));
          console.log(user._id);
        });
        return Promise.all(promises);
      })
      .then((data) => {
        let availables = [];
        data.forEach((el, idx) => {
          if (!el) availables.push(users[idx]);
        });
        res.status(200).json(availables);
      })
      .catch(console.log);
  }
  static upLocation(req, res, next) {
    const { id } = req.params;
    const { lat, lng } = req.body;
    User.update(id, { lat, lng })
      .then((data) => res.status(200).json(data.value))
      .catch(console.log);
  }
  static listOne(req, res, next) {
    const { username } = req.params;
    console.log(username)
    User.findOne(username)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch(console.log);
  }
  static listAllUser(req, res, next) {
    let users = [];
    User.findAll()
      .then((data) => {
        users = data;
        let promises = [];
        data.forEach((user) => {
          promises.push(Trip.findCurrent(String(user._id)));
          // console.log(user._id);
        });
        return Promise.all(promises);
      })
      .then((data) => {
        let allUser = data.map((el, idx) => {
          let newFormat = { ...users[idx], status: !el ? true : false };
          return newFormat;
        });
        res.status(200).json(allUser);
      })
      .catch(console.log);
  }
}
module.exports = Controller;
