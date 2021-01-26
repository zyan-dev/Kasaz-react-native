const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
};

let con = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12388881',
  password: 'JX1XkunMv8',
  database: 'sql12388881',
});

con.connect((err) => {
  if (err) {
    console.log('MySQL connection Error', err);
  } else {
    console.log('MySQL has been connected successfully!');
    app.listen(process.env.PORT || 3002);
  }
});

app.use(cors(corsOptions));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/fetch', (req, res, next) => {
  const { minPrice, maxPrice, minSquare, maxSquare, bedrooms } = req.body;
  con.query(
    `SELECT * FROM Apartment where price >= ${minPrice} and price <= ${maxPrice} and sqm >= ${minSquare} and sqm <= ${maxSquare} and bedrooms >= ${bedrooms}`,
    (err, result, fields) => {
      if (err) {
        res.send({ status: 'error', error: err });
      } else {
        res.send({ status: 'success', result });
      }
    }
  );
});

module.exports = app;
