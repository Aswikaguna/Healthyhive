var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Insurance');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app1=express()
app1.use(bodyParser.json());
app1.use(express.static('public'));
app1.use(bodyParser.urlencoded({
    extended: true
}));
  
app1.post('/insurance', function(req,res){
    var Name = req.body.name;
    var Contact= req.body.number;
    var Address= req.body.address;
    var age= req.body.Age;
    var height= req.body.Height;
    var Weight= req.body.weight;
    
    
    var data = {
        "name": Name,
        "contact":Contact,
        "address":Address,
        "Age":age,
        "Height":height,
        "weight":Weight
    }
db.collection('insurancedetails').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('success.html');
})
app1.listen(5000);
console.log("server listening at port 5000");
