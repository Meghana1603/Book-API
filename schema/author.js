const mongoose = require("mongoose");

// Author Schema
const AuthorSchema = mongoose.Schema({
    id: { 
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    books: [String],
});

// Author Model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;