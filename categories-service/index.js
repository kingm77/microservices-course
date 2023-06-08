const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.json());

const connection = mysql.createConnection({
  host: 'categories-db',
  user: 'admin',
  password: 'pswd',
  database: 'categories'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


  
app.get('/categories', (_req, res) => {
  connection.connect((err) => {
    connection.query('SELECT * FROM categories', (err, results) => {
      if (err) {
        console.error('Error retrieving category:', err);
        return res.status(500).json({ error: 'Error retrieving category from database' });
      }
      res.json(results);
    });
  });
});

app.get('/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
    
  connection.query('SELECT * FROM categories WHERE id = ?', [categoryId], async (err, results) => {
    if (err) {
      console.error('Error retrieving category:', err);
      return res.status(500).json({ error: 'Error retrieving category from database' });
    }
    
    if (results.length === 0) {
      return res.status(404).send('category not found');
    }

   res.json(results[0])
  })
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
