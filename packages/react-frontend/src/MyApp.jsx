import React, { useState } from "react";
import Table from "./Table";

function MyApp() {
  const [characters, setCharacters] = useState([
    { name: "Charlie", job: "Janitor" },
    { name: "Mac", job: "Bouncer" },
    { name: "Dee", job: "Aspiring actress" },
    { name: "Dennis", job: "Bartender" },
  ]);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={(index) =>
          removeOneCharacter(index, setCharacters, characters)
        }
      />
    </div>
  );
}

function removeOneCharacter(index, setCharacters, characters) {
  const updated = characters.filter((character, i) => i !== index);
  setCharacters(updated);
}

export default MyApp;
