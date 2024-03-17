const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

/*
 * Retrieves all Artists from the database.
 */
const getAllArtworks = async (req, res, next) => {
    //#swagger.tags=['Artwork']
    const result = await mongodb.getDatabase().db().collection('artwork').find();
    result.toArray().then((artist) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(artist);
    });
}

/*
* Retrieves a single Artist from the database.
*/
const getSingleArtwork = async (req, res, next) => {
    //#swagger.tags=['Artwork']
    const artworkId = new ObjectId(req.params.id); 
        const result = await mongodb.getDatabase().db().collection('artwork').find({ _id: artworkId });
        result.toArray().then((artist) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(artist[0]);
    });
}

/*
* Inserts an Artist from the database.
*/
const createArtwork = async (req, res) => {
    //#swagger.tags=['Artwork']
    const artwork = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        yearOfBirth: req.body.yearOfBirth,
        yearOfDeath: req.body.yearOfDeath,
        country: req.body.country,
        sex: req.body.sex
    };

    const response = await mongodb.getDatabase().db().collection('artwork').insertOne(artwork);
    if (response.acknowledged > 0){
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while inserting the artwork.');
    };
};

/*
* Updates an Artist from the database.
*/
const updateArtwork = async (req, res) => {
    //#swagger.tags=['Artwork']
   const artworkId = new ObjectId(req.params.id);
   const artwork = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        yearOfBirth: req.body.yearOfBirth,
        yearOfDeath: req.body.yearOfDeath,
        country: req.body.country,
        sex: req.body.sex
   };

   const response = await mongodb.getDatabase().db().collection('artwork').replaceOne({_id: artworkId}, artwork);
   if (response.modifiedCount > 0){
       res.status(204).send();
   }else {
       res.status(500).json(response.error || 'Some error ocurred while updating the artwork.');
   };
};


/*
* Deletes an Artist from the database.
*/
const deleteArtwork = async (req, res) => {
    //#swagger.tags=['Artwork']
   const artworkId = new ObjectId(req.params.id);
   const response = await mongodb.getDatabase().db().collection('artwork').deleteOne({_id: artworkId});
   if (response.deletedCount > 0){
       res.status(204).send();
   }else {
       res.status(500).json(response.error || 'Some error ocurred while deleting the artwork.');
   };
};

module.exports = {
   getAllArtworks,
   getSingleArtwork,
   createArtwork,
   updateArtwork,
   deleteArtwork
};
