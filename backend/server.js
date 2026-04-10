require('dotenv').config();

const express = require('express');
const app = express();

const db = require('./config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// ================= HOME =================

app.get('/', (req, res) => {
  res.send('Server is running');
});

// ================= TEST DB =================

app.get('/test-db', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.send('Database Connected ✅');
  } catch (error) {
    console.log(error);
    res.send('Database Error ❌');
  }
});

// ================= AUTH =================

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.json({ message: 'User Registered Successfully ✅' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error ❌' });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.json({ message: 'User not found ❌' });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: 'Wrong password ❌' });
    }

    const token = jwt.sign({ id: user.id }, 'secret123');

    res.json({
      message: 'Login successful ✅',
      token: token
    });

  } catch (error) {
    console.log(error);
    res.json({ message: 'Error ❌' });
  }
});

// ================= ITEMS =================

// GET ALL ITEMS
app.get('/api/items', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items');
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error ❌' });
  }
});

// CREATE ITEM
app.post('/api/items', async (req, res) => {
  try {
    const { user_id, title, description, status } = req.body;

    await db.query(
      'INSERT INTO items (user_id, title, description, status) VALUES (?, ?, ?, ?)',
      [user_id, title, description, status || 'active']
    );

    res.json({ message: 'Item created ✅' });

  } catch (error) {
    console.log(error);
    res.json({ message: 'Error ❌' });
  }
});

// UPDATE ITEM
app.put('/api/items/:id', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    await db.query(
      'UPDATE items SET title=?, description=?, status=? WHERE id=?',
      [title, description, status || 'active', req.params.id]
    );

    res.json({ message: 'Item updated ✅' });

  } catch (error) {
    console.log(error);
    res.json({ message: 'Error ❌' });
  }
});

// DELETE ITEM
app.delete('/api/items/:id', async (req, res) => {
  try {
    await db.query(
      'DELETE FROM items WHERE id=?',
      [req.params.id]
    );

    res.json({ message: 'Item deleted ✅' });

  } catch (error) {
    console.log(error);
    res.json({ message: 'Error ❌' });
  }
});

// ================= STATS =================

app.get('/api/stats', async (req, res) => {
  try {
    const [total] = await db.query(
      'SELECT COUNT(*) as total FROM items'
    );

    const [active] = await db.query(
      "SELECT COUNT(*) as active FROM items WHERE status='active'"
    );

    const [pending] = await db.query(
      "SELECT COUNT(*) as pending FROM items WHERE status='pending'"
    );

    const [completed] = await db.query(
      "SELECT COUNT(*) as completed FROM items WHERE status='completed'"
    );

    res.json({
      total: total[0].total,
      active: active[0].active,
      pending: pending[0].pending,
      completed: completed[0].completed
    });

  } catch (error) {
    console.log(error);
    res.json({ message: 'Error ❌' });
  }
});

// ================= START SERVER =================

app.listen(5000, () => {
  console.log('Server started on port 5000');
});