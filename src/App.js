import React, { useState, useEffect } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import Container from "./components/Container";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [contacts, setContacs] = useState(
    JSON.parse(window.localStorage.getItem("contacts")) ?? []
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
      ? alert(`${contact.name} is already in contacts`)
      : setContacs((prev) => [...prev, contact]);
    console.log(contacts);
  };
  const addFilter = (e) => {
    setFilter(e.currentTarget.value);
  };
  const filterList = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const deleteContact = (contactId) => {
    setContacs(contacts.filter((contact) => contact.id !== contactId));
  };
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onFilter={addFilter} />
      <ContactList contacts={filterList()} onDelete={deleteContact} />
    </Container>
  );
}
export default App;
