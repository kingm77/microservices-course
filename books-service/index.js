const { default: axios } = require('axios');
const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'OyeSapapaya2.1md',
  database: 'books'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/books', (_req, res) => {
    connection.query('SELECT * FROM books', (err, results) => {
      if (err) {
        console.error('Error retrieving books:', err);
        return res.status(500).json({ error: 'Error retrieving books from database' });
      }
      res.json(results);
    });
});
  
app.get('/books/:id', async (req, res) => {
    const bookId = parseInt(req.params.id);
    
    connection.query('SELECT * FROM books WHERE id = ?', [bookId], async (err, results) => {
      if (err) {
        console.error('Error retrieving book:', err);
        return res.status(500).json({ error: 'Error retrieving book from database' });
      }
  
      if (results.length === 0) {
        return res.status(404).send('Book not found');
      }
  
      const book = results[0];
  
      try {
        const authorRes = await axios.get(`http://authors-service:4000/authors/${book.authorId}`);
        const categoryResponse = await axios.get(`http://categories-service:5000/categories/${book.categoryId}`);
  
        const author = authorRes.data;
        const category = categoryResponse.data;
  
        const bookDetails = {
          id: book.id,
          title: book.title,
          author: author.name,
          category: category.name
        };
  
        res.json(bookDetails);
      } catch (error) {
        res.status(500).json({ error: 'Error retrieving book details' });
      }
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
