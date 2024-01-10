import React from "react";
import { useState } from "react";
function Add() {
  const [notes, setNotes] = useState({
    title: "",
    content: "",
  });

  function handleChange(e: any) {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div>
      <h3>Add a New Workout</h3>

      <label>Note Title:</label>
      <input type="text" onChange={handleChange} name="title" />

      <label>Note Content:</label>
      <input type="number" onChange={handleChange} name="content" />
    </div>
  );
}

export default Add;
