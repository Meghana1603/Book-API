const express = require("express");

//database
const Database = require("./database");

const OurApp = express();

OurApp.get("/", (request, response)=> {
    response.json({message: "Server is working"});
});

OurApp.get("/book",(req,res) => {
    return res.json({books: Database.Book});
});

OurApp.listen(4000, ()=> console.log("server running"));