import React from 'react';
import './App.css';

function App() {
  return (
    <>
      <div className='header'>
        <h1>Side Quest Simulator</h1>
      </div>
      <div className='body'></div>
      <div className='guy'></div>
      <div className="buttons">
        <button className="buttons complete">Complete</button>
        <button className="buttons reject">Reject</button>
      </div>
    </>
  );
}

export default App;
