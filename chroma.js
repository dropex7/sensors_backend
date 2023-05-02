const {ChromaClient} = require('chromadb');

const url = process.env.CHROMA_URL;

const client = new ChromaClient(url);

module.exports = client