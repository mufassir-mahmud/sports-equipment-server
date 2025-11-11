const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 4001;
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config()

// console.log(process.env.DB_User)

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.gbbfjrz.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('This is sports-equipment-server')
})

app.listen(port,()=>{
    console.log(`This server is running on port ${port}`)
})