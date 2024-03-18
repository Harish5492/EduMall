
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

console.log("accountSid", accountSid, authToken)
const client = require('twilio')(accountSid, authToken);


const TwilioConfig = {
    client : client
}


const Phonepay = {
    redirectUrlUser : "http://10.10.2.30:3000",
    redirectUrlAdmin : "http://10.10.2.37:3000",
    redirectUrlBackend : "http://10.10.2.29:8000"
}


module.exports = {TwilioConfig , Phonepay}