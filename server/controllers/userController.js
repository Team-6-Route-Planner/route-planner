const { User } = require('../models');
class Controller {
    static login(req, res, next) {
        User.findOne({
            where: {
                first_name: req.body.first_name,
                last_name: req.body.last_name
            }
        })
        .then(data => {
            if(data) {
                req.userData = data;
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: 'User not found!'});
            }
        })
        .catch(err => res.status(500).json(err));
    }
}
module.exports = Controller;