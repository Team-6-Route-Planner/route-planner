const Trip = require('../models/trip');
//disini require shortestTrip
const shortestTrip = require('../helpers/shortestTrip');
class Controller {
    static add(req, res, next) {
        const { addresses, userId } = req.body // addresses buat dilempar ke shortestTrip
        //disini invoke shortestTrip buat dapetin array of routes
        const routes = [
            {
              lat: -6.2533787,
              lng: 106.7819161,
              address: 'Jl. Sultan Iskandar Muda Blok BC No.7, RT.3/RW.5, Kby. Lama Sel., Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240, Indonesia'
            },
            {
              lat: -6.4901067,
              lng: 106.8306951,
              address: 'Cibinong, Bogor, West Java, Indonesia'
            },
            {
              lat: -7.0892971,
              lng: 107.4440254,
              address: 'Ciwidey, Bandung, West Java, Indonesia'
            },
            {
              lat: -6.2611984,
              lng: 107.0421324,
              address: 'Tambun Selatan, Bekasi, West Java, Indonesia'
            },
            {
              lat: -6.2655371,
              lng: 106.784339,
              address: 'Jalan Metro Pondok Indah Kav. IV, RW.16, Pd. Pinang, Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12310, Indonesia'
            }
        ]
        Trip.create({
            routes,
            userId: Number(userId),
            status: false
        })
        .then(data => res.status(200).json(data))
        .catch(console.log);
    }
    static list(req, res, next) {
        Trip.findAll()
        .then(data => res.status(200).json(data))
        .catch(console.log);
    }
    static listOneCurrent(req, res, next) {
        const { userId } = req.params;
        Trip.findCurrent(Number(userId))
        .then(data => res.status(200).json(data))
        .catch(console.log);
    }
    static edit(req, res, next) {
        const { id } = req.params;
        const { status } = req.body;
        Trip.update(id, { status })
        .then(data => res.status(200).json(data))
        .catch(console.log);
    }
}
module.exports = Controller;