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

  const handleChoice = (choice:string) => {
    fetch("http://localhost:4000/choice", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({choice, questStep})
    })
      .then(res => res.json())
      .then(data => {
        if (data.step) setQuestStep(data.step)
      })
      .catch(err => console.error("failed at choice call", err))
  }

  return (
    <>
      <div className='header'>
        <h1>Side Quest Simulator</h1>
      </div>
      <div className='body'>{questStep}</div>
      <div className='guy'></div>
      <div className="buttons">
        <button className="buttons complete" onClick={() => handleChoice("complete")}>Complete</button>
        <button className="buttons reject" onClick={() => handleChoice("reject")}>Reject</button>
      </div>
    </>
  );
}

export default App;
