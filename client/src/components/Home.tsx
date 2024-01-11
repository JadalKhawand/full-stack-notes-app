import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {
  interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  }
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllNotes() {
      try {
        const res = await axios.get("http://localhost:5000/notes");
        setLoading(false);
        setNotes(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllNotes();
  }, []);

  async function handleDelete(id: number) {
    try {
      await axios.delete("http://localhost:5000/notes/delete/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>Notes App</h1>
          <h2>Your Thoughts, Anytime, Anywhere.</h2>
        </div>
        <div>
          <button className="add">
            <Link to="/add">Add new Note</Link>
          </button>
        </div>
      </div>
      <div className="notes">
        {loading ? (
          <p>Loading...</p>
        ) : (
          notes.map((note) => (
            <div className="note" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <h5>{note.createdAt}</h5>
              <div className="buttons">
                <button
                  className="update"
                  onClick={() => handleUpdate(note.id)}
                >
                  Update
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
