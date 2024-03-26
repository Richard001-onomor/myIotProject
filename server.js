const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.get("/",(req,res)=>{
  res.status(200).send("hello! know now that Jesus is Lord")
});

// Route to handle incoming data from Postman
app.post('/data', (req, res) => {
  const jsonData = req.body; // Get JSON data from the request body
  console.log('Received JSON data:', jsonData);
  res.status(200).json({ message: 'JSON data received successfully' }); // Send response
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
