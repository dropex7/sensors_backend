const express = require("express");
const client = require("../chroma");
var router = express.Router();

router.get('/', async function(req, res, next) {
    try{
        const collection = await client.getCollection(req.query.name);
        res.send(await collection.peek(10));
    }catch (e){
        next(e);
    }
});

router.get('/all', async function(req, res) {
    try{
        const collection = await client.listCollections()
        res.send(collection);
    }catch (e){
        res.send(e);
    }
});

router.post('/', async function(req, res){
    try{
        const result = await client.createCollection(req.query.name)
        res.send('collection created')
    }catch(e){
        res.send("collection not created")
    }
});

router.delete('/', async function(req, res){
    const collection = await client.getCollection(req.query.name);
    await collection.delete()
    res.send('collection clear')
});

module.exports = router;