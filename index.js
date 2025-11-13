const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 4001;
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config()



const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.gbbfjrz.mongodb.net/?appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const equipmentCollections = client.db("SportsDB").collection("Equipment");
    app.post("/equipments", async(req,res)=>{
      const newData = req.body;
      const result = await equipmentCollections.insertOne(newData);
      res.send(result)
    })

    
  } finally {
   
    
  }
}
run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('This is sports-equipment-server')
})

app.listen(port,()=>{
    console.log(`This server is running on port ${port}`)
})