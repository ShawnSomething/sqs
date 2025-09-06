import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questStep, setQuestStep] = useState<string>("")

  useEffect(() => {
    fetch("http://localhost:4000/start", {method: "POST"})
      .then(res => res.json())
      .then(data => setQuestStep(data.step))
      .catch(err => console.error("failed initial load", err))
  })

  return (
    <>
      <div className='header'>
        <h1>Side Quest Simulator</h1>
      </div>
      <div className='body'>{questStep}</div>
      <div className='guy'></div>
      <div className="buttons">
        <button className="buttons complete">Complete</button>
        <button className="buttons reject">Reject</button>
      </div>
    </>
  );
}

export default App;
