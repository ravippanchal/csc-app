import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={(index) =>
          removeOneCharacter(index, setCharacters, characters)
        }
      />
      <Form handleSubmit={updateList} />
    </div>
  );

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
  function updateList(person) {
    postUser(person)
      .then((response) => response.json())
      .then((data) => {
        setCharacters([...characters, data]);
      })
      .catch((error) => console.error("Error creating a user:", error));
  }
  function removeOneCharacter(index) {
    const id = characters[index].id;
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          const updatedCharacters = characters.filter(
            (character, i) => i !== index
          );
          setCharacters(updatedCharacters);
        } else if (response.status === 404) {
          console.error("User not found");
        }
      })
      .catch((error) => console.error("Error deleting the user:", error));
  }
}

export default MyApp;
