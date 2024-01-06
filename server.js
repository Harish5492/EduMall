const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoDB = require('./config/database');

const Api = require('./routers/index');
const cors = require('cors')
//conect database
mongoDB();
// app.use

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// app.use('/user', () => Api);
app.use('/user', Api.userRouter); 
app.use('/user', Api.otpRouter); 
app.use('/user', Api.billingRouter); 
app.use('/user', Api.courseRouter); 

// listening port

app.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port} -- connected successfully`);
});

// app.listen(3000,'10.10.2.82') 
