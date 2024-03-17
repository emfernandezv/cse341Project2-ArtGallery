const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

/*
 * Retrieves all Artists from the database.
 */
const getAllArtists = async (req, res, next) => {
    //#swagger.tags=['Artist']
    const result = await mongodb.getDatabase().db().collection('artist').find();
    result.toArray().then((artist) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(artist);
    });
}

/*
* Retrieves a single Artist from the database.
*/
const getSingleArtist = async (req, res, next) => {
    //#swagger.tags=['Artist']
    const artistId = new ObjectId(req.params.id); 
        const result = await mongodb.getDatabase().db().collection('artist').find({ _id: artistId });
        result.toArray().then((artist) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(artist[0]);
    });
}

/*
* Inserts an Artist from the database.
*/
const createArtist = async (req, res) => {
    //#swagger.tags=['Artist']
    const artist = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        yearOfBirth: req.body.yearOfBirth,
        yearOfDeath: req.body.yearOfDeath,
        country: req.body.country,
        sex: req.body.sex
    };

    const response = await mongodb.getDatabase().db().collection('artist').insertOne(artist);
    if (response.acknowledged > 0){
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while inserting the artist.');
    };
};

/*
* Updates an Artist from the database.
*/
const updateArtist = async (req, res) => {
    //#swagger.tags=['Artist']
   const artistId = new ObjectId(req.params.id);
   const artist = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        yearOfBirth: req.body.yearOfBirth,
        yearOfDeath: req.body.yearOfDeath,
        country: req.body.country,
        sex: req.body.sex
   };

   const response = await mongodb.getDatabase().db().collection('artist').replaceOne({_id: artistId}, artist);
   if (response.modifiedCount > 0){
       res.status(204).send();
   }else {
       res.status(500).json(response.error || 'Some error ocurred while updating the artist.');
   };
};


/*
* Deletes an Artist from the database.
*/
const deleteArtist = async (req, res) => {
    //#swagger.tags=['Artist']
   const artistId = new ObjectId(req.params.id);
   const response = await mongodb.getDatabase().db().collection('artist').deleteOne({_id: artistId});
   if (response.deletedCount > 0){
       res.status(204).send();
   }else {
       res.status(500).json(response.error || 'Some error ocurred while deleting the artist.');
   };
};

module.exports = {
   getAllArtists,
   getSingleArtist,
   createArtist,
   updateArtist,
   deleteArtist
};
