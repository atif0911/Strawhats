const express = require("express")
const mongoose = require("mongoose")
const app= express()

mongoose.connect("mongodb+srv://jyotirmoy:jyotirmoy123%40J@cluster0.u5jim.mongodb.net/diseasedata?retryWrites=true&w=majority&appName=Cluster0")
const userSchema = new mongoose.Schema({
    name:String,
    age:Number
})
const userModel = mongoose.model("backenddata", userSchema);
const backenddata1 = new userModel({
    name:"Jyotirmoy",
    age:20
})
backenddata1.save();
app.listen("3001", ()=>{
    console.log("Server is running!");
})