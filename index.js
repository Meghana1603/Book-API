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
    return res.json({ books: Database.Book});
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
// Params  - category
// Body    - none
OurApp.get("/book/c/:category", (req, res) => {
    const getBook = Database.Book.filter((book) => 
    book.category.includes(req.params.category)
    );
    return res.json({ books: getBook });
});

// Route   - /book/a/:authorID
// Des     - to get a list of books based on authorID
// Access  - Public
// Method  - GET
// Params  - authorID
// Body    - none
OurApp.get("/book/a/:authorID", (req, res) => {
    const getBook = Database.Book.filter((book) => 
    book.authors.indexOf(parseInt(req.params.authorID)) != -1
    );
    return res.json({ books: getBook });
});

// Route   - /author
// Des     - to get all authors
// Access  - Public
// Method  - GET
// Params  - none
// Body    - none
OurApp.get("/author",(req,res) => {
    return res.json({ authors: Database.Author});
});

// Route   - /author/:authorID
// Des     - to get a specific author based on id
// Access  - Public
// Method  - GET
// Params  - authorID
// Body    - none
OurApp.get("/author/:authorID", (req, res) => {
    const getAuthor = Database.Author.filter((author) => 
    author.id == parseInt(req.params.authorID)
    );
    return res.json({ author: getAuthor });
});

// Route   - /publication
// Des     - to get all publication
// Access  - Public
// Method  - GET
// Params  - none
// Body    - none
OurApp.get("/publication",(req,res) => {
    return res.json({ publications: Database.Publication});
});

// Route   - /publication/:publicationID
// Des     - to get a specific publication based on id
// Access  - Public
// Method  - GET
// Params  - publicationID
// Body    - none
OurApp.get("/publication/:publicationID", (req, res) => {
    const getPublication = Database.Publication.filter((publication) => 
    publication.id == parseInt(req.params.publicationID)
    );
    return res.json({ publication: getPublication });
});

OurApp.listen(4000, ()=> console.log("server running"));