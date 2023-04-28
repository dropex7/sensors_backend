const express = require("express");
const client = require("../chroma");
var router = express.Router();

router.get('/', async function(req, res) {
    const collection = await client.getCollection(req.query.name);
    res.send(JSON.stringify(await collection.peek(10)));
});

router.post('/', async function(req, res){
    await client.createCollection(req.query.name)
    res.send('collection created')
});

router.delete('/', async function(req, res){
    const collection = await client.getCollection(req.query.name);
    await collection.delete()
    res.send('collection clear')
});

module.exports = router;