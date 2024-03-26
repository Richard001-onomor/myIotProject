const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.get("/",(req,res)=>{
  res.status(200).send("hello! know now that Jesus is Lord")
});
// Route to handle incoming data from NodeMCU
// app.post('/data', (req, res) => {
//   const sensorData = req.body.sensorValue;
//   console.log('Received sensor data:', sensorData);
//   res.sendStatus(200); // Send OK response
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
