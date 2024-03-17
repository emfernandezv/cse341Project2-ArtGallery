const express = require('express');
const router = express.Router();
const util = require('../utilities/index');
const validator = require('../utilities/validator')

const artistController = require('../controllers/artistController');

router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getSingleArtist);
router.post('/',validator.artistValidationRules(),validator.validate, artistController.createArtist);
router.put('/:id',validator.artistValidationRules(),validator.validate, artistController.updateArtist);
router.delete('/:id', artistController.deleteArtist);
/*
router.get('/', util.handleErrors(artistController.getAllArtists));
router.get('/:id', util.handleErrors(artistController.getSingleArtist));
router.post('/', util.handleErrors(artistController.createArtist));
router.put('/:id',util.handleErrors(artistController.updateArtist));
router.delete('/:id',util.handleErrors(artistController.deleteArtist));
*/
module.exports = router;