const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const dotenv = require('dotenv').config();
const api_key = process.env.apikey;
const list_id = process.env.listid;
app.get("/",function(req,res){
  res.sendFile(__dirname + '/signup.html');
});
app.post("/",function(req,res){
var fname = req.body.fname;
var lname = req.body.lname;
var email = req.body.email;

var data ={
  members : [
    {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname,
      }
    }
  ]
};
var jsonData = JSON.stringify(data);



var options = {
  url: "https://us4.api.mailchimp.com/3.0/lists/"+ list_id ,
method : "POST",
headers: {
  "Authorization":"raman1 " + api_key,
},
body: jsonData,
}
request(options,function(error,response , body){
if(error){
  console.log(error);
  res.sendFile(__dirname + '/failure.html');
}else{
  var st = response.statusCode;
  if(st==200)
  res.sendFile(__dirname + '/success.html');
  else res.sendFile(__dirname + '/failure.html');
}

});


});
app.post("/failure.html",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT||3000,function(){
  console.log("Server running on port 3000");
});
