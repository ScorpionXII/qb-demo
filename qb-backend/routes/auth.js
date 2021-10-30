const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', sessionController.login);

router.post('/logout', sessionController.logout);

router.post('/checkSession', sessionController.checkSession);

module.exports = router;
