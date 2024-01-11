import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './components/Home';
import Add from './components/Add';
import Update from './components/Update';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/add' element={<Add />}></Route>
        <Route path='/notes/update/:id' element={<Update />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
