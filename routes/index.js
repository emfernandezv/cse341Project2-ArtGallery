const router = require('express').Router();
const artworkRoutes = require('./artwork');
const artistRoutes = require('./artist');
const swaggerRoutes = require('./swagger');
const passport = require('passport');
router.use('/', swaggerRoutes);

router.use('/artist', artistRoutes);
router.use('/artwork', artworkRoutes);

router.get('/login', passport.authenticate('github', (req, res) => {}));

router.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if (err) {return next(err); }
        res.redirect('/')
    });
});

module.exports = router;