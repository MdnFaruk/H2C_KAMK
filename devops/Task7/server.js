const express = require('express');
const DHT = require('./dht-sensors');
const dht = new DHT();
const cors = require('cors')
const app = express();

const addr = '0.0.0.0';
const port = 8888;

app.use(cors());

// Handle root directory
app.get('/', (req, res) => {
 res.send("Hello world!");
});

// Handle sensor data
app.get('/api/v1/:sensor_id', (req, res) => {
   console.log("request for sensor data");
  let sensor_id = req.params.sensor_id;
  res.send(dht.read_json(sensor_id));
});

app.listen(port, addr, () => {
  console.log(`Server running at https://dwbl.dclabra.fi/api/v1/dht1 (for one minute)`);
  setTimeout(function() {
    console.log("Gracefully closing server application! See you!");
    process.exit(0);
  }, 60000);
});

module.exports = app;