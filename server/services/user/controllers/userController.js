const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class Controller {
    static register(req, res, next) {
        const { username } = req.body;
        const password = bcrypt.hashSync(req.body.password, 10);
        User.findOne(username)
        .then(data => {
            if(data) {
                return res.status(400).json({ message: "Username exists" });
            } else {
                return User.signUp({ username, password })
            }
        })
        .then(data => {
            if(data) {
                res.status(201).json(data)
            }
        })
        .catch(err => console.log(err));
    }
    static login(req, res, next) {
        const { username, password } = req.body
        User.findOne(username)
        .then(data => {
            if(!data) {
                res.status(404).json({ message: "Username not found" });
            } else if(!bcrypt.compareSync(password, data.password)){
                res.status(400).json({ message: "Wrong password" });
            } else {
                // const access_token = jwt.sign({
                //     _id: data._id,
                //     username: data.username
                // }, process.env.JWT);
                res.status(200).json({ message: "Login success", _id: data._id, username: data.username })
            }
        })
        .catch(err => res.status(500).json(err));
    }
}
module.exports = Controller;