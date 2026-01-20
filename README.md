# node-user-crud-api-ERD-Digram
# User Management API 🚀

A simple **User Management CRUD API** built with **Node.js and Express**, using a JSON file as a lightweight database.  
Includes a clean **frontend API tester** to interact with all endpoints without Postman.

---

## ✨ Features

- Add new users
- Update existing users (partial update)
- Delete users
- Get user by ID
- Search users by name
- Filter users by minimum age
- Retrieve all users
- Frontend UI for testing all API endpoints
- JSON file used as a database (`users.json`)
- CORS enabled for frontend-backend communication

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **File System (fs)**
- **HTML, CSS, JavaScript (Frontend Tester)**

---

## 📂 Project Structure
├── main.js # Express server & API routes
├── users.json # JSON database
├── index.html # Frontend API tester



****************************ERD-Digram****************************

Musicana records have decided to store information on musicians who perform on their albums in a database. The company has wisely chosen to hire you as a database designer.
o
Each musician that is recorded at Musicana has an ID number,a name, an address (street, city) and a phone number.
o
Each instrument that is used in songs recorded at Musicana has a unique name and a musical key (e.g., C, B-flat, E-flat).
o
Each album that is recorded at the Musicana label has a unique title, a copyright date, and an album identifier.
o
Each song recorded at Musicana has a unique title and an author.
o
Each musician may play several instruments, and a given instrument may be played by several musicians.
o
Each album has a number of songs on it, but no song may appear on more than one album.
o
Each song is performed by one or more musicians, and a musician may perform a number of songs.
o
Each album has exactly one musician who acts as its producer.
o
A producer may produce several albums.
