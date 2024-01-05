//const { MongoClient } = require('mongodb');

// const dbName = 'loginapi';

// let db;

// let conn = MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, 
//   async (err, client) => {

//   try {
//     if (err) {
//       throw new Error('Error connecting to MongoDB: ' + err);
//     }

//     console.log('Connected to MongoDB');
//     db = client.db(dbName);
//   } catch (error) {
//     console.error(error.message);
//   }
// });
// module.exports = conn;


// const connectToCluster = async () => {
//   let mongoClient;
//   const mongoUrl = 'mongodb+srv://vedantb658:191020@cluster0.hzehkah.mongodb.net/';

//   try {
//       mongoClient = new MongoClient(mongoUrl);
//       console.log('Connecting to MongoDB Atlas cluster...');
//       await mongoClient.connect();
//       console.log('Successfully connected to MongoDB Atlas!');

//       return mongoClient;
//   } catch (error) {
//       console.error('Connection to MongoDB Atlas failed!', error);
//       process.exit();
//   }
// }

// module.exports = {connectToCluster};
 
// const { MongoClient } = require('mongodb');
// const uri = 'mongodb+srv://vedantb658:191020@cluster0.hzehkah.mongodb.net/'; 
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB', error);
//   }
// }
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://vedantb658:191020@cluster0.hzehkah.mongodb.net/your-database-name', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to db');
    return connection;
  } catch (err) {
    console.error('Error while connecting to database', err);
    throw err;
  }
};

module.exports = { connectToDatabase };