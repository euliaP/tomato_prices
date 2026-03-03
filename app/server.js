const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();


// Get environment variables for database connection
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const databaseName = process.env.DB_NAME || "tomato_prices";


// Database connection details
const mongoUrlDocker = `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
console.log(`Attempting to connect to MongoDB at: ${mongoUrlDocker}`);


// Global database variable to hold the connection
let db


// Manually add the price data to the DB
const populateDatabase = async () => {
    try {
        const collection = db.collection('prices');

        const initialPrices = [
            { tomato_id: 'cherry', price: '5 EUR per kg' },
            { tomato_id: 'biotomato', price: '5.5 EUR per kg' },
            { tomato_id: 'regulartomato', price: '3.5 EUR per kg' }
        ];

        for (const item of initialPrices) {
            await collection.updateOne(
                { tomato_id: item.tomato_id },
                { $set: item },
                { upsert: true }
            );
        }
        console.log('Database successfully populated with tomato prices.');
    } catch (err) {
        console.error('Failed to populate the database:', err);
    }
};


// Connect to the database once, then start the server
const startApp = async () => {
    try {
        console.log(`Attempting to connect to MongoDB at: ${mongoUrlDocker}`);
        
        const client = await MongoClient.connect(mongoUrlDocker);
        db = client.db(databaseName);

        console.log('Successfully connected to MongoDB.');

        await populateDatabase(); 

        app.listen(3000, '0.0.0.0', () => {
            console.log("App listening on port 3000!");
        });

    } catch (err) {
        console.error('CRITICAL ERROR: Could not connect to MongoDB', err);
        process.exit(1);
    }
};


startApp();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "tomatostarter.html"));
});


app.get('/tomato_image', (req, res) => {
  const tomatoType = req.query.tomato_type;
  let imagePath;

  switch (tomatoType) {
    case 'cherry':
      imagePath = 'tomato_images/cherry.jpg';
      break;
    case 'biotomato':
      imagePath = 'tomato_images/biotomato.jpg';
      break;
    case 'regulartomato':
      imagePath = 'tomato_images/regulartomato.jpg';
      break;
    default:
      imagePath = 'tomato_images/regulartomato.jpg'; 
      break;
  }

  const absolutePath = path.join(__dirname, imagePath);
  res.sendFile(absolutePath, (err) => {
    if (err) {
        console.error(`Error sending file for type "${tomatoType}": `, err);
        res.status(404).json({error: 'Image not found.'});
    }
  })
});


app.get('/tomato_price', async (req, res) => {
  const tomatoType = req.query.tomato_type;
  const validTomatoTypes = ['cherry', 'biotomato', 'regulartomato'];
  if (!tomatoType || !validTomatoTypes.includes(tomatoType)) {
    return res.status(400).json({error: 'Invalid tomato_type. Must be cherry, biotomato, or regulartomato.'})
  }
  try {
      const myquery = { tomato_id: tomatoType };
      const result = await db.collection("prices").findOne(myquery);
      res.send(result ? result : {});
  } catch (err) {
      console.error('Error fetching tomato price:', err);
      res.status(500).send({ error: 'Internal server error.' });
  }
});


app.get('/tomato_page', (req, res) => {
    res.sendFile(path.join(__dirname, "tomato_page.html"));
});