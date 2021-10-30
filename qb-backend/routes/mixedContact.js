const express = require('express');
const router = express.Router();
const mixedContactController = require('../controllers/mixedContactController.js');
const authChecker = require('../middlewares/authCheckerMiddleware.js');

/*
 * GET
 */
router.get('/', authChecker, mixedContactController.list);

/*
 * GET
 */
router.get('/:id', mixedContactController.show);

/*
 * POST
 */
router.post('/', mixedContactController.create);

/*
 * PUT
 */
router.put('/:id', mixedContactController.update);

/*
 * DELETE
 */
router.delete('/:id', mixedContactController.remove);

module.exports = router;
