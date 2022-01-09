require("dotenv").config();
require('./config/connect-db');
const Admin = require('./app/DBOperations/Admin');
const Coach = require('./app/DBOperations/Coach');

console.log("Project is being initialized.");
Admin.create({name:"Jon Snow", email:"jon.snow@bluesport.com", password: "12345678"});
console.log("An admin has been generated with email jon.snow@bluesport.com and password 12345678.");

Coach.create({name:"Bran Stark", email:"bran.stark@bluesport.com", password: "12345678"});
console.log("An coach has been generated with email bran.stark@bluesport.com and password 12345678.");

Coach.create({name:"Arya Stark", email:"arya.stark@bluesport.com", password: "12345678"});
console.log("An coach has been generated with email arya.stark@bluesport.com and password 12345678.");






