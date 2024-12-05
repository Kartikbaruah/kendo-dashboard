const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kendo_dashboard',
  password: 'postgres',
  port: 5432,
});

app.listen(5000, () => {
  console.log('Backend server is running on port 5000');
});

// Users API
// Get all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT user_id AS id, name, email, role FROM users ORDER BY user_id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error fetching users: ' + err.message);
  }
});

// Add a new user
app.post('/users', async (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Name, email, and role are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING user_id AS id, name, email, role',
      [name, email, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error adding user: ' + err.message);
  }
});

// Update a user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
      [name, email, role, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error updating user: ' + err.message);
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error deleting user: ' + err.message);
  }
});

//METRICS//

app.get('/metrics', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM metrics');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error fetching metrics: ' + err.message);
  }
});

//SALES//

app.get('/sales', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sales');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error fetching sales: ' + err.message);
  }
});

//LOGS//

app.get('/logs', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query('SELECT * FROM logs LIMIT $1 OFFSET $2', [limit, offset]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error fetching paginated logs: ' + err.message);
  }
});

//TASKS//

app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error fetching tasks: ' + err.message);
  }
});
