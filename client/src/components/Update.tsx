import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Update() {
  const [note, setNote] = useState({
    id: "",  // Add the id property to your state
    title: "",
    content: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract note ID from the URL
    const noteId = location.pathname.split("/")[3];
    // Set the note ID in the state
    setNote((prevNote) => ({ ...prevNote, id: noteId }));
  }, [location.pathname]);

  function handleChange(e:any) {
    setNote((prevNote) => ({
      ...prevNote,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e:any) {
    e.preventDefault();
    try {
      // Use the correct URL format for the PUT request
      await axios.put(`http://localhost:5000/notes/update/${note.id}`, note);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form">
      <h3>Update Note</h3>
      <div className='updated-note'>
        <label>Note Title:</label> <br />
        <input type="text" onChange={handleChange} name="title" />
      </div>
      <div className='updated-note'>
        <label>Note Content:</label> <br />
        <textarea onChange={handleChange} name="content" />
      </div>
      <button className="submit-button" onClick={handleSubmit}>Update Note</button>
    </div>
  );
}

export default Update;
