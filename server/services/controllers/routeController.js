const Route = require('../models/route');
const Trip = require('../models/trip');
class Controller {
    static edit(req, res, next) {
        const { userId, routeId } = req.params;
        const { status, arrivedAt } = req.body;
        let updatedRoute;
        Route.update(routeId, { status, arrivedAt })
        .then((data) => {
            updatedRoute = data.value;
            return Trip.findCurrent(userId);
        })
        .then(data => {
            let foundIndex = data.routes.findIndex(el => {
                console.log(el._id, '<< el.id')
                console.log(routeId, '<<< routeId')
                return String(el._id) === String(routeId)
            })
            let newRoutes = [...data.routes];
            newRoutes[foundIndex] = updatedRoute;
            return Trip.update(data._id, {
                routes: newRoutes
            })
        })
        .then(data => {
            res.status(200).json(data.value);
        })
        .catch(console.log);
    }
}
module.exports = Controller;