const express = require('express');
const router = express.Router();
const util = require('../utilities/index');
const validator = require('../utilities/validator');
const {isAuthenticated} = require('../utilities/authenticate');


const artistController = require('../controllers/artistController');

router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getSingleArtist);
router.post('/',isAuthenticated, validator.artistValidationRules(),validator.validate, artistController.createArtist);
router.put('/:id',isAuthenticated, validator.artistValidationRules(),validator.validate, artistController.updateArtist);
router.delete('/:id',isAuthenticated, artistController.deleteArtist);
/*
router.get('/', util.handleErrors(artistController.getAllArtists));
router.get('/:id', util.handleErrors(artistController.getSingleArtist));
router.post('/',validator.artistValidationRules(),validator.validate, util.handleErrors(artistController.createArtist));
router.put('/:id',validator.artistValidationRules(),validator.validate, util.handleErrors(artistController.updateArtist));
router.delete('/:id',util.handleErrors(artistController.deleteArtist));
*/
module.exports = router;