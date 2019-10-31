const express = require('express');
const app = express();
const router = express.Router();
const route = require('./routes/index');
const users = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true  });

app.use(cors())
//use routes
app.use('/', route);
app.use('/api/users', users);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(
    err.message
  );
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
