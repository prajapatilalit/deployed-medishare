
const mongoose = require("mongoose");


const Hospital = new mongoose.Schema({
    Name : {
        type : String,
        required : true
        
    },
    Description : {

    },
    Specialisation : {
        type : String,
        required : true
    },
    location : {
        type : Object,
        required : true
        
    }
  
})


const hospital = mongoose.model('Hospitals', Hospital);

module.exports = hospital;
