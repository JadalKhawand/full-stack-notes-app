import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

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
        const token = localStorage.getItem("accessToken");
        if (!token) {
          return;
        }
        const res = await axios.get("http://localhost:5000/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      setNotes(notes.filter((n) => n.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <>
      <img src="/2.png" alt="icon" />

      <div className="container">
        <div className="header">
          <div className="auth">
            <h3>
              <Link to="/users/login">
                <button className="home-log" onClick={handleLogout}>
                  Logout
                </button>
              </Link>
            </h3>
          </div>
          <div className="first-section">
            <h1>Notes App</h1>
            <h2>Your Thoughts, Anytime, Anywhere.</h2>
          </div>
          <div>
            <Link to="/add">
              <button className="add">Add new Note</button>
            </Link>
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
                <h5>
                  {/* @ts-ignore */}
                  {formatDistanceToNow(new Date(note.createdAt), {
                    addSuffix: true,
                  })}
                </h5>
                <div className="buttons">
                  <Link to={`notes/update/${note.id}`}>
                    <button className="update">Update</button>{" "}
                  </Link>

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
    </>
  );
}

export default Home;
