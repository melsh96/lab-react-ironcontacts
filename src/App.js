import "./App.css";
import personnes from "./contacts.json";
import { useState } from "react";

function App() {
  const [contacts, setContacts] = useState(personnes.slice(0, 5));

  function randomContact() {
    const currentIds = contacts.map((a) => a.id);
    const pseudoRandom = personnes.filter((c) => {
      if (!currentIds.includes(c.id)) {
        return c;
      }
    });

    const index = Math.floor(Math.random() * pseudoRandom.length);
    // let newContact = personnes[index];
    // 1) copy state
    let copy = [...contacts, pseudoRandom[index]];

    // 2) New contact to copy
    copy.push(copy);

    // 3) give setContacts the copy
    setContacts(copy);
  }

  function sortName() {
    // sort
    const sortedNames = contacts.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    // give setContacts the copy
    setContacts([...sortedNames]);
  }

  function sortPopularity() {
    const sortedList = contacts.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    // give setContacts the copy
    setContacts([...sortedList]);
  }

  function deleteContact(id) {
    // const filteredContacts = contacts.filter((personnes) => {
    //   return personnes.id !== id;
    // });
    // setContacts([...filteredContacts]);
    const copy = contacts.filter((c) => c.id !== id);
    setContacts(copy);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={randomContact}>Add Random Contact</button>
      <button onClick={() => sortName()}>Sort by name</button>
      <button onClick={() => sortPopularity()}>Sort by popularity</button>
      <div className="table-one">
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won Oscar</th>
              <th>Won Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((element) => (
              <tr key={element.id}>
                <td>
                  <img
                    src={element.pictureUrl}
                    alt={element.name}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>{element.name}</td>
                <td>{element.popularity}</td>
                <td>{element.wonOscar ? "🏆" : ""}</td>
                <td>{element.wonEmmy ? "🌟" : ""}</td>
                <td>
                  <button onClick={() => deleteContact(contacts.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
