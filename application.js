const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

const port = 3000
const flights = require('./flight-docs/flights.js');

app.get('/', function(req, res){
  res.send('Hello World!!!')
});


app.get('/api/flights', cors(), function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");

  var response = [];
    response = flights.filter(function(flightDetail){
      if((flightDetail.flightNumber == req.query.fNumber || (flightDetail.origin == req.query.origin && flightDetail.destination == req.query.destination)) 
    	 && flightDetail.departure == req.query.date){
        return flightDetail;
      }
    });

  res.send(response);
});

app.listen(port, () => console.log(`App listening on port ${port}!`))