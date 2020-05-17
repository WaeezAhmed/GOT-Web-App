const express = require('express');
const router = express.Router();

//Item
const Item = require('../../models/Item')

router.get('/', (req,res) => {
    Item.find()
        .then(items => res.json(items));
});

router.get('/list', (req,res) => {
    Item.distinct('location')
        .then(items => res.json(items));
});

router.get('/count', (req,res) => {
    Item.count()
        .then(items => res.json(items));
});

router.get('/search', (req,res) => {
    var query = {};
    query['$and'] = [];

    if (req.query.king)
        query["$and"].push( { $or:[ {'attacker_king': req.query.king}, {'defender_king': req.query.king} ] })
    if (req.query.location)
        query["$and"].push({ 'location': req.query.location});
    if (req.query.battle_type)
        query["$and"].push({ 'battle_type': req.query.battle_type})
    if (req.query.region)
        query["$and"].push({ 'region': req.query.region})

    Item.find(query)
        .then(items => res.json(items))
        .catch(err => res.status(404).json({ success: false}));
    // res.send(x);      
});  

module.exports = router;