import express from "express";
import cors from "cors";

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

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};
/*
app.get("/users", (req, res) => {
  res.send(users);
});
*/
const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  user.id = `id_${Math.random().toString(36)}`;
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  if (!findUserById(userToAdd.id)) {
    // Ensures no duplicate users based on ID
    const newUser = addUser(userToAdd);
    res.status(201).send(newUser);
  } else {
    res.status(409).send({ error: "User with this ID already exists" }); // Conflict if user exists
  }

  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const initialLength = users.users_list.length;
    users.users_list = users.users_list.filter((user) => user.id !== id);

    // Check if the length of the array has changed to determine if a user was deleted
    if (users.users_list.length < initialLength) {
      res.status(204).send(); // No content to send back, but indicates success
    } else {
      res.status(404).send({ error: "User not found" }); // No user found with the given ID
    }
  });
});
