// const express=require("express");
// const https=require("https");
// const bodyparser=require("body-parser");
import express  from "express";
import https from "https";
import bodyparser from "body-parser";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    // res.sendFile("C:/Users/Poonam Kumari/Pictures/angela projects/index.html");
})

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apikey="61f9e8a073b63a4d81ba2abd00342fee";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const weatherdes=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const imgurl="http://openweathermap.org/image/wn/"+icon+"@2x.png";
            res.write("<p>Weather is currently"+weatherdes+"</p>");
            res.write("<h1>The temp in"+query+" is "+temp+"degree celcius");
            res.write("<imf src="+imgurl+">");
            res.send();
        });
    });
})

app.listen(3000,function(){
    console.log("server running on port 3000");
})