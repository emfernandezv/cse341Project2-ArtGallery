const router = require('express').Router();
const artworkRoutes = require('./artwork');
const artistRoutes = require('./artist');
const swaggerRoutes = require('./swagger');

router.use('/', swaggerRoutes);

router.use('/artist', artistRoutes);
router.use('/artwork', artworkRoutes);


module.exports = router;