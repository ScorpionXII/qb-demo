const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const authChecker = require('../middlewares/authCheckerMiddleware');

router.post('/', authChecker, mainController.createContactFromGithub);

module.exports = router;
