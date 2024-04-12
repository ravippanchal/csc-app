import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

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

  function updateList(person) {
    setCharacters([...characters, person]);
  }
}

function removeOneCharacter(index, setCharacters, characters) {
  const updated = characters.filter((character, i) => i !== index);
  setCharacters(updated);
}

export default MyApp;
