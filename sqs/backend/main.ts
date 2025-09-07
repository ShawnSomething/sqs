import * as fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { setOutput } from "./state";

const questsPath = path.join(__dirname, "quests.json"); 
const quests = JSON.parse(fs.readFileSync(questsPath, "utf-8"));

let selectedQuest: { id: number; quest: string; followUps: any[] } | null = null;
let questStep = 0;

export const start = async (isWeb = false) => {
  const msg = "Hey there! I am trapped in your device! help me experience the wonders of life by doing these quests~";
  console.log(msg);
  setOutput(msg);

  const ids = quests.map((q: { id: any; }) => q.id);
  const selectedId = ids[Math.floor(Math.random() * ids.length)];
  selectedQuest = quests.find((q: { id: any; }) => q.id === selectedId);
  questStep = 0;

  const questMsg = { id: selectedQuest?.id, quest: selectedQuest?.quest, followUps: selectedQuest?.followUps };
  console.log(questMsg);
  setOutput(JSON.stringify(questMsg));

  if (!isWeb) {
    const answer = await inquirer.prompt([
      { type: "list", name: "choice", message: "Will you help me experience this?", choices: ["Complete", "Reject"] }
    ]);
    await completeQuest(answer.choice, questStep, false);
  } else {
    return questMsg;
  }
};

export const subQuestSelect = async (stepIndex: number, isWeb = false) => {
  if (!selectedQuest) return null;
  const followUps = selectedQuest.followUps;
  const selectedSubQuest = followUps[stepIndex];

  if (!selectedSubQuest) {
    const doneMsg = "All Quests Done! Thanks for helping me experience human life.";
    console.log(doneMsg);
    setOutput(doneMsg);
    if (isWeb) return { done: true, message: doneMsg };
    return;
  }

  const subMsg = { parentId: selectedQuest.id, subQuest: selectedSubQuest };
  console.log(subMsg);
  setOutput(JSON.stringify(subMsg));

  if (!isWeb) {
    const answer = await inquirer.prompt([
      { type: "list", name: "choice", message: stepIndex === 0 ? "What's next?" : "I feel so alive!", choices: ["Complete", "Reject"] }
    ]);
    await completeQuest(answer.choice, stepIndex + 1, false);
  } else {
    return subMsg;
  }
};

export const completeQuest = async (choice: string, stepIndex: number, isWeb = true) => {
  if (choice === "Complete") {
    if (!selectedQuest) {
      return start(isWeb);
    }

    if (stepIndex >= selectedQuest.followUps.length) {
      const doneMsg = "All Quests Done! Thanks for helping me experience human life.";
      console.log(doneMsg);
      setOutput(doneMsg);
      selectedQuest = null;
      questStep = 0;
      if (isWeb) return { done: true, message: doneMsg };
      return;
    }

    return subQuestSelect(stepIndex, isWeb);
  } else if (choice === "Reject") {
    const rejectMsg = "Aw... Did you want to start a brand new quest?";
    console.log(rejectMsg);
    setOutput(rejectMsg);
    selectedQuest = null;
    questStep = 0;
    return start(isWeb);
  }
};



if (require.main === module) {
  start(false);
}
