const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());

bookRouter.route('/books')
  //SAVE a book
  .post((req,res)=>{
    const book = new Book(req.body);
    book.save();
    console.log(book);
    return res.status(201).json(book);
  })
  //GET all books
  .get((req, res) => {
    //const query = req.query;
    //const {query} = req;
    const query = {};
    if(req.query.genre){
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

  //GET single book
  bookRouter.route('/books/:bookId')
  .get((req, res) => {

    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port  ${port}`);
});
