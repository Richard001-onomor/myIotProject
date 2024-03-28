const express = require('express');
const bodyParser = require('body-parser');
// const axios = require('axios'); // Import axios module
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.text());

// app.get("/",(req,res)=>{
//   res.status(200).send("hello! know now that Jesus is Lord")
// });

// // Route to handle incoming data(json) from Postman
// // app.post('/data', (req, res) => {
// //   const jsonData = req.body; // Get JSON data from the request body
// //   console.log('Received JSON data:', jsonData);
// //   res.status(200).json({ message: 'JSON data received successfully' }); // Send response
// // });


// // Route to handle incoming data(number) from Postman
// app.post('/data', (req, res) => {
//   const number = req.body; // Extract number from the request body
//   console.log('Received number:', number);
//   res.set('Content-Type', 'text/plain'); // Set response content type to plain text
//   res.status(200).send('Number received successfully'); // Send response as plain text



//   // Send message to Arduino over WiFi
//   const arduinoIP = '192.168.43.25'; // Replace with your Arduino's IP address
//   const arduinoPort = 80; // Replace with the port your Arduino is listening on
//   const url = `http://${arduinoIP}:${arduinoPort}/`;

//   const numberString = String(number);

//   axios.post(url, numberString)
//     .then(response => {
//       console.log('Response from Arduino:', response.data);
//       res.status(200).send('Message sent to Arduino');
//     })
//     .catch(error => {
//       console.error('Error sending message to Arduino:', error);
//       res.status(500).send('Error communicating with Arduino');
//     });
// });

// // });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





// app.get("/",(req,res)=>{
//   res.status(200).send("hello! know now that Jesus is Lord")
// });

// Route to handle incoming JSON data from Postman
// app.post('/data', (req, res) => {
  // const jsonData = req.body; // Get JSON data from the request body
  // console.log( jsonData);

  // Convert JSON data to string
  // const jsonString = JSON.stringify(jsonData);

  // Send message to Arduino over WiFi
  // const arduinoIP = '192.168.43.25'; // Replace with your Arduino's IP address
  // const arduinoPort = 80; // Replace with the port your Arduino is listening on
  // const url = `http://${arduinoIP}:${arduinoPort}/`;

  // axios.post(url, jsonString)
  //   .then(response => {
  //     console.log('Response from Arduino:', response.data);
  //     res.status(200).send('Message sent to Arduino');
  //   })
  //   .catch(error => {
  //     console.error('Error sending message to Arduino:', error);
  //     res.status(500).send('Error communicating with Arduino');
  //   });
// });

// app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
// });







app.get("/", (req, res) => {
  // Read the saved number from the file
  fs.readFile(path.join(__dirname, 'data.txt'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      res.status(500).send('Error reading data file');
    } else {
      // Send the number as the response
      res.status(200).send(data);
    }
  });
});

// Route to handle incoming JSON data from Postman
// app.post('/data', (req, res) => {
//   const jsonData = req.body; // Get JSON data from the request body
//   console.log('Received JSON data:', jsonData);

// Route to handle incoming data(number) from Postman
app.post('/data', (req, res) => {
  const number = req.body; // Extract number from the request body
  console.log(number);
  res.set('Content-Type', 'text/plain'); // Set response content type to plain text
  res.status(200).send('Number received successfully'); // Send response as plain text

  // Save the JSON data to a file
  fs.writeFile(path.join(__dirname, 'data.txt'), number, (err) => {
    if (err) {
      console.error('Error saving data to file:', err);
      res.status(500).send('Error saving data to file');
    } else {
      console.log('Data saved to file successfully');
      // res.status(200).send('Number saved successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


