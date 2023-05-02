var express = require('express');
var client = require('../chroma')
const uuid = require('uuid');
var router = express.Router();


/* GET K-nearest neighbor. */
router.get('/', async function(req, res, next) {
  const {name, sensors} = req.body
  const {magnetometer, barometer} = sensors

  try{
    const collection = await client.getCollection(name);
    const results = await collection.query(
        query_embeddings=[[magnetometer, barometer, 0]],
        n_results=1,
    );
    const {metadatas} = results
    const {x, y} = metadatas[0][0]
    res.send(JSON.stringify({x, y}));
  }catch (e){
    next(e)
  }
});


/* add new position. */
router.post('/', async function(req, res, next){
  const {name, position, sensors} = req.body
  const {magnetometer, barometer} = sensors
  const {x, y} = position

  try{
    const collection = await client.getCollection(name);

    await collection.add(
        uuid.v4(),
        [magnetometer, barometer, 0],
        {x, y},
    )
    res.send('point added')
  }catch(e){
    next(e)
  }
});

module.exports = router;
