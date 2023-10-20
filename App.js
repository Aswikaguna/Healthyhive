var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/FeedbackDetails');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/contact', function(req,res){
    var Name = req.body.pname;
    var Emailid = req.body.email;
    var Contact= req.body.number;
    var Feedback =req.body.comments;
    
    var data = {
        "pname": Name,
        "email":Emailid,
        "number":Contact,
        "comments":Feedback
    }
db.collection('Feedbackdetails').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('success.html');
})
app.listen(8000);
console.log("server listening at port 8000");
