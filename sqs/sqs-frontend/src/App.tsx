import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ghostIdle from './ghost.webm'
import ghostSad from './ghostsad.webm'
import ghostHappy from './ghosthappy.webm'


const API_URL = "/api"
const loopTime = 30000

function App() {
  const [questStep, setQuestStep] = useState<any>(null);
  const [questStepIndex, setQuestStepIndex] = useState<number>(0);
  const [currentGhost, setCurrentGhost] = useState(ghostIdle)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/start`, { method: "POST" })
      .then(res => res.json())
      .then(data => {
        setQuestStep(data.step);
        setQuestStepIndex(0);
      })
      .catch(err => console.error("failed initial load", err));
  }, []);

    useEffect(() => {
      if (currentGhost === ghostIdle) return
      const timer = setTimeout(() => setCurrentGhost(ghostIdle), loopTime)
      return () => clearTimeout(timer)
    }, [currentGhost])

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.src = currentGhost;
        videoRef.current.load();
        videoRef.current.play();
      }
    }, [currentGhost]);

  const handleChoice = (choice: string) => {
    if (choice === "Reject") setCurrentGhost(ghostSad)
    if (choice === "Complete") setCurrentGhost(ghostHappy)

    fetch(`${API_URL}/choice`, {
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

      <div className='guy'>
        <div className='animations'>
          <video ref={videoRef} autoPlay loop muted playsInline />
        </div>
      </div>

      <div className="buttons">
        <button className="buttons complete" 
        onClick={() => {
          handleChoice("Complete") 
          setCurrentGhost(ghostHappy)
        }}>
          Complete
        </button>
        <button className="buttons reject" 
        onClick={() => {
          handleChoice("Reject")
          setCurrentGhost(ghostSad)
        }}>
          Reject
        </button>
      </div>
    </>
  );
}

export default App;
