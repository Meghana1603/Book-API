const express = require("express");

//database
const Database = require("./database");

const OurApp = express();

OurApp.get("/", (request, response) => {
    response.json({message: "Server is working"});
});

// Route   - /book
// Des     - to get all books
// Access  - Public
// Method  - GET
// Params  - none
// Body    - none
OurApp.get("/book",(req,res) => {
    return res.json({books: Database.Book});
});

// Route   - /book/:bookID
// Des     - to get a book based on ISBN
// Access  - Public
// Method  - GET
// Params  - bookID
// Body    - none
OurApp.get("/book/:bookID", (req, res) => {
    const getBook = Database.Book.filter((book) => 
    book.ISBN == req.params.bookID
    );
    return res.json({ book: getBook });
});

// Route   - /book/c/:category
// Des     - to get a list of books based on category
// Access  - Public
// Method  - GET
// Params  - bookID
// Body    - none
OurApp.get("/book/c/:category", (req, res) => {
    const getBook = Database.Book.filter((book) => 
    book.category.includes(req.params.category)
    );
    return res.json({ book: getBook });
});

OurApp.listen(4000, ()=> console.log("server running"));