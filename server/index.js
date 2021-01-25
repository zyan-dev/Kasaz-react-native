var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var app = express();

var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
};

var con = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12388881',
  password: 'JX1XkunMv8',
  database: 'sql12388881',
});

con.connect(function (err) {
  if (err) {
    console.log('MySQL connection Error', err);
  } else {
    console.log('MySQL has been connected successfully!');
    app.listen(3002);
  }
});

app.use(cors(corsOptions));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.post('/fetch', function (req, res, next) {
  const {minPrice, maxPrice, minSquare, maxSquare, bedrooms} = req.body;
  con.query(
    `SELECT * FROM Apartment where price >= ${minPrice} and price <= ${maxPrice} and sqm >= ${minSquare} and sqm <= ${maxSquare} and bedrooms >= ${bedrooms}`,
    function (err, result, fields) {
      if (err) {
        res.send({status: 'error', error: err});
      } else {
        res.send({status: 'success', result});
      }
    },
  );
});
