require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//API
const Book = require("./API/book");
const Author = require("./API/author");
const Publication = require("./API/publication");

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log("Connection Established!"))
.catch((err) =>console.log(err));


const OurApp = express();

OurApp.use(express.json());

//Microservices
OurApp.use("/book", Book);
OurApp.use("/author", Author);
OurApp.use("/publication", Publication);

OurApp.get("/", (request, response) => {
    response.json({message: "Server is working"});
});

//GET

//POST

//PUT

//DELETE

OurApp.listen(4000, ()=> console.log("Server is running"));