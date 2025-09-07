import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questStep, setQuestStep] = useState<any>(null);
  const [questStepIndex, setQuestStepIndex] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:4000/start", { method: "POST" })
      .then(res => res.json())
      .then(data => {
        setQuestStep(data.step);
        setQuestStepIndex(0);
      })
      .catch(err => console.error("failed initial load", err));
  }, []);

  const handleChoice = (choice: string) => {
    fetch("http://localhost:4000/choice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choice, questStepIndex })
    })
      .then(res => res.json())
      .then(data => {
        if (data.step) {
          if (data.step.done) {
            setQuestStep({ quest: data.step.message });
            setQuestStepIndex(0);
          } else {
            setQuestStep(data.step);
            if (data.step.subQuest) setQuestStepIndex(prev => prev + 1);
            else setQuestStepIndex(0);
          }
        }
      })
      .catch(err => console.error("failed at choice call", err));
  };

  const getStepText = (step: any) => {
    if (!step) return "Loading...";
    if (step.quest) return step.quest;
    if (step.subQuest?.quest) return step.subQuest.quest;
    return JSON.stringify(step);
  };

  return (
    <>
      <div className='header'>
        <h1>Side Quest Simulator</h1>
        <p className='para'>I am trapped in your device! help me experience the wonders of life by doing these quests~</p>
      </div>

      <div className='body'>{getStepText(questStep)}</div>

      <div className='guy'></div>

      <div className="buttons">
        <button className="buttons complete" onClick={() => handleChoice("Complete")}>
          Complete
        </button>
        <button className="buttons reject" onClick={() => handleChoice("Reject")}>
          Reject
        </button>
      </div>
    </>
  );
}

export default App;
