const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.json());

const connection = mysql.createConnection({
  host: 'authors-db',
  user: 'admin',
  password: 'pswd',
  database: 'authors'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


  
app.get('/authors', (_req, res) => {
  connection.connect((err) => {
    connection.query('SELECT * FROM authors', (err, results) => {
      if (err) {
        console.error('Error retrieving authors:', err);
        return res.status(500).json({ error: 'Error retrieving authors from database' });
      }
      res.json(results);
    });
  });
});

app.get('/authors/:id', (req, res) => {
  const authorId = parseInt(req.params.id);
    
  connection.query('SELECT * FROM authors WHERE id = ?', [authorId], async (err, results) => {
    if (err) {
      console.error('Error retrieving author:', err);
      return res.status(500).json({ error: 'Error retrieving author from database' });
    }
    
    if (results.length === 0) {
      return res.status(404).send('author not found');
    }

   res.json(results[0])
  })
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
