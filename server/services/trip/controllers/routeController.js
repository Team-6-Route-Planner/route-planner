const Route = require('../models/route');
class Controller {
    static edit(req, res, next) {
        const { id } = req.params;
        const { status, arrivedAt } = req.body;
        Route.update(id, { status, arrivedAt })
        .then((data) => res.status(200).json(data.value))
        .catch(console.log);
    }
}
module.exports = Controller;