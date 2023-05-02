const {ChromaClient} = require('chromadb');

const url = "http://server:8000"

const client = new ChromaClient(url);

module.exports = client