import express from "express";
import cors from "cors";
import userService from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Fetch users with optional filter by name or job
app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userService
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((err) => res.status(500).send({ error: err.message }));
});

// Fetch user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userService
    .findUserById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((err) => res.status(500).send({ error: err.message }));
});

// Add new user
app.post("/users", (req, res) => {
  userService
    .addUser(req.body)
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => res.status(500).send({ error: err.message }));
});

// Delete user by ID
app.delete("/users/:id", (req, res) => {
  userService
    .deleteUser(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send({ error: "User not found" });
      }
    })
    .catch((err) => res.status(500).send({ error: err.message }));
});
