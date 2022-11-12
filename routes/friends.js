const router = require('express').Router();
const friendshipController = require('../controllers/friendShipController');

router.get('/addFriend', friendshipController.addFriend);

module.exports = router;