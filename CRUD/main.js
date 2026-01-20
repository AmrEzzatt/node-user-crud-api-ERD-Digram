const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());

///////////////////////**************Front-End****************\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
///////////////////////***************************************\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 


const usersFile = path.join(__dirname, 'users.json');

// Helper functions
function readUsers() {
    const data = fs.readFileSync(usersFile, "utf-8");
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// PORT
const PORT = 3000;

// 1️⃣ POST /users — Add new user
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Name, email, and age are required.' });
    }

    const users = readUsers();
    const exists = users.find(user => user.email === email);
    if (exists) {
        return res.status(409).json({ error: 'User with this email already exists.' });
    }

    const newUser = { id: users.length ? users[users.length - 1].id + 1 : 1, name, email, age };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json(newUser);
});

// 2️⃣ PATCH /user/:id — Update user
app.patch("/user/:id", (req, res) => {
    const userId = Number(req.params.id);
    const { name, email, age } = req.body;

    const users = readUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;

    writeUsers(users);

    res.json({ message: "User updated", user });
});

// 3️⃣ DELETE /user/:id
app.delete("/user/:id", (req, res) => {
    const users = readUsers();
    const id = Number(req.params.id);

    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ message: "User not found" });

    const deletedUser = users.splice(index, 1)[0];
    writeUsers(users);

    res.json({ message: "User deleted", deletedUser });
});

// 4️⃣ GET /users/Byname?name=...
app.get('/users/Byname', (req, res) => {
    let { name = '' } = req.query; // default value
    const users = readUsers();
    const filterUsers = users.filter(u => u.name.toLowerCase() === name.toLowerCase());
    res.json(filterUsers);
});

// 5️⃣ GET /users/filter?minAge=...
app.get('/users/filter', (req, res) => {
    let { minAge } = req.query;
    minAge = Number(minAge);

    if (isNaN(minAge)) return res.status(400).json({ message: "Invalid minAge" });

    const users = readUsers();
    const filterUsers = users.filter(u => u.age >= minAge);
    res.json(filterUsers);
});

// 6️⃣ GET /user — All users
app.get("/user", (req, res) => {
    const users = readUsers();
    res.json(users);
});

// 7️⃣ GET /user/:id — Get user by ID
app.get("/user/:id", (req, res) => {
    const id = Number(req.params.id);
    const users = readUsers();

    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});
