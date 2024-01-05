const express = require('express');
const app = express();

// Add this middleware to parse JSON in the request body
app.use(express.json());

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      throw new Error('Invalid username or password');
    }

    res.json({ message: 'Login successful!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3300;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});