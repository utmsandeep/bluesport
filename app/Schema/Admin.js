const {Schema}  = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new Schema({
    
    name : String,
    email : String,
    password : String,

});

schema.pre('save' , function (next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = schema;