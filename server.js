// main file
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoDB = require('./config/database');
const Api = require('./routers/index');
const {attachWebSocket,sendNotificationToAll} = require('./websocket/websocket');

const app = express(); 
const server = http.createServer(app);

const port = 3008;

// Connect to the database
mongoDB();

// Middleware 
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routers
// app.use('/', (req,res)=>{
//   res.json({message : "successful "})
// })
app.use('/user', Api.userRouter); 
app.use('/user', Api.otpRouter); 
app.use('/user', Api.billingRouter); 
app.use('/user', Api.courseRouter); 
app.use('/user', Api.referalRouter); 
app.use('/user', Api.affiliateRouter);
app.use('/admin/adminArea', Api.rewardRouter);
app.use('/ASB',Api.asbRouter)
app.use('/admin/adminArea', Api.adminRouter); 
app.use('/question/', Api.questionAnsRouter); 


// Attach WebSocket
attachWebSocket(server);

// Start the server
server.listen(port, (err) => {
  if (err) {
    return console.log('ERROR', err);
  }
  console.log(`Listening on port ${port} -- connected successfully`);
});

