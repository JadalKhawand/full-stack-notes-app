import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
function Home() {
  interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  }
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
   async function fetchAllNotes() {
    try {
      
      const res = await axios.get("http://localhost:5000/notes")
      setLoading(false)
      setNotes(res.data)
      console.log(res)
      
      
    } catch (err) {
      console.log(err)
    }
      
    }
    fetchAllNotes()
  },[])


  return (
    <div className='container'>
      <div className='header'>
      <h1>Notes App</h1>
      <h2>Your Thoughts, Anytime, Anywhere.</h2>
      </div>
      <div className='notes'>

      {loading? 
      <p>Loading...</p>:
      notes.map((note)=>(
        
        <div className="note" key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <h5>{note.createdAt}</h5>
          <div className='buttons'>
          <button className="update">Update</button>
          <button className="delete">Delete</button>
          </div>
        </div>
      ))}
      
      </div>
      <button>
        <Link to='/add'>Add new Note</Link>
      </button>
    </div>
    
  )
}

export default Home