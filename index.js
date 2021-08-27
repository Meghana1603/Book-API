require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');

//database
const Database = require("./database");

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("Connection Established!"))
.catch((err) =>console.log(err));


const OurApp = express();

OurApp.use(express.json());

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
    book.authors.indexOf(parseInt(req.params.authorID)) !== -1
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





// Route   - /book/new
// Des     - add new book
// Access  - Public
// Method  - POST
// Params  - none
OurApp.post("/book/new", (req, res) => {
    const { newBook } = req.body;
    //add new data
    Database.Book.push(newBook);
    return res.json(Database.Book);
});

// Route   - /author/new
// Des     - add new author
// Access  - Public
// Method  - POST
// Params  - none
OurApp.post("/author/new", (req, res) => {
    const { newAuthor } = req.body;
    //add new author to database
    Database.Author.push(newAuthor);
    return res.json(Database.Author);
});

// Route   - /publication/new
// Des     - add new publication
// Access  - Public
// Method  - POST
// Params  - none
OurApp.post("/publication/new", (req, res) => {
    const { newPublication } = req.body;
    //add new publication to database
    Database.Publication.push(newPublication);
    return res.json(Database.Publication);
});

// Route   - /book/update/:isbn
// Des     - update any detils of book
// Access  - Public
// Method  - PUT
// Params  - ISBN
OurApp.put("/book/update/:isbn", (req, res) => {
    const { updatedBook } = req.body;
    const { isbn } = req.params;

    const book = Database.Book.map((book) => {
        if(book.ISBN === isbn) {
            return {...book, ...updatedBook}
        }
        return book;
    });

    return res.json(book);
});

// Route   - /book/updateAuthor/:isbn
// Des     - update/add new author to a book
// Access  - Public
// Method  - PUT
// Params  - ISBN
OurApp.put("/book/updateAuthor/:isbn", (req, res) => {
    const { newAuthor } = req.body;
    const { isbn } = req.params;

    const book = Database.Book.map((book) => {
        if(book.ISBN === isbn ){
            if(!book.authors.includes(newAuthor)){
                book.authors.push(newAuthor);
                return book;
            }
            return book;
        }
        return book;
    });

    const author = Database.Author.map((author) => {
        if(author.id === newAuthor) {
            if(!author.books.includes(isbn)){
                author.books.push(isbn);
                return author;
            }
            return author;
        }
        return author;
    });
    return res.json({book: book, author: author});
});

// Route   - /author/update/:id
// Des     - update any details of the author
// Access  - Public
// Method  - PUT
// Params  - id
OurApp.put("/author/update/:id", (req, res) => {
    const { updatedAuthor } = req.body;
    const { id } = req.params;

    const author = Database.Author.map((author) => {
        if(author.id === parseInt(id)) {
            return {...author, ...updatedAuthor}
        }
        return author;
    });

    return res.json(author);
});

// Route   - /publication/update/:id
// Des     - update any details of the publication
// Access  - Public
// Method  - PUT
// Params  - id
OurApp.put("/publication/update/:id", (req, res) => {
    const { updatedPublication } = req.body;
    const { id } = req.params;

    const publication = Database.Publication.map((publication) => {
        if(publication.id === parseInt(id)) {
            return {...publication, ...updatedPublication}
        }
        return publication;
    });

    return res.json(publication);
});

// Route   - /book/updateTitle/:isbn
// Des     - update title of a book
// Access  - Public
// Method  - PUT
// Params  - id
OurApp.put("/book/updateTitle/:isbn", (req, res) => {
    const { updatedBook } = req.body;
    const { isbn } = req.params;

    Database.Book.forEach((book) => {
        if(book.ISBN === isbn) {
            book.title = updatedBook.title;
            return book;
        }
        return book;
    });

    return res.json(Database.Book);
});

// Route   - /author/updateName/:id
// Des     - update name of a author
// Access  - Public
// Method  - PUT
// Params  - id
OurApp.put("/author/updateName/:id", (req, res) => {
    const { updatedAuthor } = req.body;
    const { id } = req.params;

    Database.Author.forEach((author) => {
        if(author.id === parseInt(id)) {
            author.name = updatedAuthor.name;
            return author;
        }
        return author;
    });

    return res.json(Database.Author);
});

// Route   - /book/delete/:isbn
// Des     - delete a book
// Access  - Public
// Method  - DELETE
// Params  - isbn
OurApp.delete("/book/delete/:isbn", (req, res) => {
    const { isbn } = req.params;

    const filteredBooks = Database.Book.filter((book) => book.ISBN !== isbn);
    Database.Book = filteredBooks;
    return res.json(Database.Book);
});

// Route   - /book/delete/author/:isbn/:id
// Des     - delete an author from a book
// Access  - Public
// Method  - DELETE
// Params  - isbn, id
OurApp.delete("/book/delete/author/:isbn/:Id", (req, res) => {
    const { isbn, Id } = req.params;

    Database.Book.forEach((book) => {
        if(book.ISBN === isbn) {
            if(!book.authors.includes(parseInt(Id))) {
                return book;
            }
            book.authors = book.authors.filter((id) => id !== parseInt(Id));
            return book;
        }
        return book;
    });

    Database.Author.forEach((author) => {
        if(author.id === parseInt(Id)) {
            if(!author.books.includes(isbn)){
                return author;
            }
            author.books = author.books.filter((book) => book !== isbn );
            return author;
        }
        return author;
    });
    return res.json({book: Database.Book, author: Database.Author});
});

// Route   - /author/delete/:id
// Des     - delete an author
// Access  - Public
// Method  - DELETE
// Params  - id
OurApp.delete("/author/delete/:id", (req, res) => {
    const { id } = req.params;
    const filteredAuthors = Database.Author.filter((author) => author.id !== parseInt(id));
    Database.Author = filteredAuthors;
    return res.json(Database.Author);
});

// Route   - /publication/delete/:id
// Des     - delete a publication
// Access  - Public
// Method  - DELETE
// Params  - id
OurApp.delete("/publication/delete/:id", (req, res) => {
    const { id } = req.params;
    const filteredPublication = Database.Publication.filter((publication) => publication.id !== parseInt(id));
    Database.Publication = filteredPublication;
    return res.json(Database.Publication);
});

// Route   - /publication/delete/book/:isbn/:Id
// Des     - delete a book from publication
// Access  - Public
// Method  - DELETE
// Params  - id, isbn
OurApp.delete("/publication/delete/book/:isbn/:Id", (req, res) => {
    const { isbn, Id } = req.params;

    Database.Book.forEach((book) => {
        if(book.ISBN === isbn) {
            book.publication = 0; 
            return book;
        }
        return book;
    });
    
    Database.Publication.forEach((publication) => {
        if(publication.id === parseInt(Id)) {
            publication.books = publication.books.filter((book) => book !== isbn); 
            return publication;
        }
        return publication;
    });

    return res.json({book: Database.Book, publication: Database.Publication});
});

OurApp.listen(4000, ()=> console.log("Server is running"));