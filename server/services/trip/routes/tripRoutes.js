const router = require('express').Router();
const Controller = require('../controllers/tripController');

router.post('/', Controller.add);
router.get('/', Controller.list);
router.get('/:userId', Controller.listOneCurrent);
router.put('/:id', Controller.edit);

module.exports = router;