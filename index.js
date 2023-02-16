



const express = require('express')
const cors = require('cors');
const app = express()
let bodyParser = require('body-parser');
const dotenv = require('dotenv');
let port = process.env.PORT || 2400
dotenv.config();


const url = 'mongodb+srv://test:test123@cluster0.rqzfmzk.mongodb.net/bmsData?retryWrites=true&w=majority';

const {MongoClient} = require("mongodb");

const client = new MongoClient(url);


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


async function getData (){
    let result = await client.connect();
    let db = result.db("bmsData");
    return db;
}



app.get('/movies', async (req, res) => {
    let data = await getData();
    let collection = await data.collection('movies').find().toArray();
    console.log(collection);
    res.send(collection);
});


app.get('/', (req, res) => {
    res.send("hello world")
})


app.listen(port )