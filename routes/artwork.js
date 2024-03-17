const express = require('express');
const router = express.Router();
const util = require('../utilities');
const validator = require('../utilities/validator')

const artworkController = require('../controllers/artworkController.js');

router.get('/', artworkController.getAllArtworks);
router.get('/:id', artworkController.getSingleArtwork);
router.post('/', validator.artworkValidationRules(), artworkController.createArtwork);
router.put('/:id',validator.artworkValidationRules(),artworkController.updateArtwork);
router.delete('/:id',artworkController.deleteArtwork);

/*
router.get('/', util.handleErrors(artworkController.getAllArtworks));
router.get('/:id', util.handleErrors(artworkController.getSingleArtwork));
router.post('/', util.handleErrors(artworkController.createArtwork));
router.put('/:id',util.handleErrors(artworkController.updateArtwork));
router.delete('/:id',util.handleErrors(artworkController.deleteArtwork));
*/
module.exports = router;