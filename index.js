const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const equipmentUsersCollections = client.db("SportsDB").collection("Users")
    app.get("/equipments", async (req, res) => {
  const { email } = req.query;

  let query = {};
  if (email) {
    query = { email: email }; // filter by logged-in user email
  }
  app.get('/equipments/:id', async(req,res) =>{
    const id = req.params.id;
    const query = {_id : new ObjectId(id)};
    const result = await equipmentCollections.findOne(query);
    res.send(result)
  })
  const result = await equipmentCollections.find(query).toArray();
  res.send(result);
});

    app.post("/equipments", async(req,res)=>{
      const newData = req.body;
      const result = await equipmentCollections.insertOne(newData);
      res.send(result)
    })

    app.delete('/equipments/:id', async(req,res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await equipmentCollections.deleteOne(query);
      res.send(result)
    })
    app.put('/equipments/:id', async(req,res) =>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}
      const options = {upsert: true};
      const updatedEquipment = req.body
      const updatedDoc = {
        $set : updatedEquipment
      }
      const result = await equipmentCollections.updateOne(filter, updatedDoc, options);
      res.send(result)
    })
    /**
     * 
     * */  
    app.post("/users", async(req,res) =>{
      const newUser = req.body;
      const result = await equipmentUsersCollections.insertOne(newUser);
      res.send(result)
    })

    app.get("/users", async(req,res)=>{
      const result = await equipmentUsersCollections.find().toArray();
      res.send(result)
    })

    // app.get('/equipments', async(req,res) =>{
    //    console.log("Received email:", req.query.email);
    //   const {email} = req.query;
    //   const equipments = await equipmentCollections.find({email}).toArray()
    //   res.send(equipments)
    // })
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