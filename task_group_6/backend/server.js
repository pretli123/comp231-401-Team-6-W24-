const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs_login = require('fs').promises;

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3009;
const tasksFilePath = path.join(__dirname, 'tasks.json');
const SECRET_KEY = 'your_secret_key_here'; // Keep secret in an environment variable in production

   




// Middleware
app.use(cors());
app.use(bodyParser.json());

const generateToken = (username) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).send({ message: "A token is required for authentication" });

  try {
    const token_= token.substring(7)
    const decoded = jwt.verify(token_, SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next();
};


// Read tasks from JSON file
const readTasks = () => {
  if (!fs.existsSync(tasksFilePath)) {
    return {};
  }
  const tasksRaw = fs.readFileSync(tasksFilePath);
  console.log(tasksRaw)
  let a= JSON.parse(tasksRaw)
  return a;
};

// Write tasks to JSON file
const writeTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};


app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).send('Username and password are required');
  }

  try {
      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Load existing users
      const usersPath = path.join(__dirname, 'users.json');
      let users = [];
      try {
          const data = await fs_login.readFile(usersPath, 'utf8');
          users = JSON.parse(data);
      } catch (err) {
          // Assume file does not exist if we get an error reading
          console.log('No existing user file, creating new one');
      }

      // Check if user already exists
      if (users.users.find(u => u.username === username)) {
          return res.status(400).send('Username already exists');
      }

      // Append new user
      users.users.push({ username, password });

      // Save the updated user array back to the file
      await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

      res.send('User registered successfully!');

  } catch (err) {
      console.error('Error processing signup', err);
      res.status(500).send('Error registering user');
  }
});


// Updated login route to return a token
app.post('/login', async(req, res) => {
  const { username, password } = req.body;
  // Here you should validate the username and password with your user store
  // For simplicity, we skip the actual user store validation
  // If validation is successful, generate a token

  try {
    const data = await fs_login.readFile('./users.json', 'utf8');
    
    const users = JSON.parse(data);

    // Check if any user matches the login credentials
    const user = users.users.find(u => u.username === username && u.password === password);

    if (user) {
      const token = generateToken(username);
      res.json({ username, token });

    } else {
        res.status(401).send("Invalid username or password");
    }

} catch (error) {
    console.error("Error reading user data:", error);
    res.status(500).send("Server error");
} 
});


// Get tasks for a user
// app.get('/tasks', verifyToken,(req, res) => {

//   const tasks = readTasks();
//   const userTasks = tasks[req.user.username] || [];
//   res.json(userTasks);
// });

app.get('/tasks',verifyToken,(req, res) => {

  const tasks = readTasks();
  const userTasks = tasks[req.user.username] || [];
  res.json(userTasks);
});

// Add a task for a user
app.post('/tasks', verifyToken,(req, res) => {
  const { task } = req.body;

 
  if(task != null){
    const username = req.user.username;
    
    const tasks = readTasks();
 
    tasks[username] = task;
   
    writeTasks(tasks);
    res.json({ message: "Task added successfully" });
  }else{
    res.json({message :"task is empty"});
  }


});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
