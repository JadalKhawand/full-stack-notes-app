import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Add() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  function handleChange(e: any) {
    setNote((prevNotes) => ({
      ...prevNotes,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/notes/create", note);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    console.log("Submitted");
  }

  return (
    <div className="form">
      <h3>Add a New Workout</h3>
      <div>
        <label>Note Title:</label> <br />
        <input type="text" onChange={handleChange} name="title" />
      </div>
      <div>
        <label>Note Content:</label> <br />
        <textarea onChange={handleChange} name="content" />
      </div>
      <button onClick={handleSubmit}>Add Note</button>
    </div>
  );
}

export default Add;
