// run `npm install --save node-dht-sensor` 
// if you wanna run this on real hardware
// var sensor_api = require("node-dht-sensor");

let dht_sensors = [
    { 'id': 'dht1', 'type': 22, 'pin': 17, 'data': {} }
  ]
  
  
  class DHT {
    constructor() {
      console.log("initializing sensor platform");
      console.log("starting periodic read operation of", dht_sensors.length, "sensors");
      setInterval((function () {
        // Read and update sensors periodically
        this.read_dht_sensors();
      }).bind(this), 1000);
    }
  
    read_json(sensor_id) {
      let resp = {'id': sensor_id};
      for (var sensor in dht_sensors) {
        if(dht_sensors[sensor].id == sensor_id) {
          console.log("found sensor", dht_sensors[sensor]);
          resp.data = dht_sensors[sensor].data;
          break;
        }
        else {
          console.log("no sensor", sensor_id);
        }
      }
      return resp;
    }
  
    read_dht_sensors() {
      dht_sensors[0].data = { 'temperature': (25 + Math.random()).toFixed(2), 'humidity': (45 + Math.random()).toFixed(2) };
      console.log(dht_sensors[0].data)
      /* this is the original code
      for (var sensor in dht_sensors) {
        let item = dht_sensors[sensor];
        sensor_api.read(item.type, item.pin, function (err, temperature, humidity) {
          if (!err) {
            //console.log(`sensor: ${dht_sensors[sensor].type} temp: ${temperature.toFixed(2)}°C, humidity: ${humidity.toFixed(2)}%`);
            item.data = { 'temperature': temperature.toFixed(2), 'humidity': humidity.toFixed(2) };
  //          console.log(item);
          }
          else {
            console.log("couldn't read sensor", item.id);
          }
        });
        
      }*/
    }
  }
  
  module.exports = DHT;