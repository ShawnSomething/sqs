
import * as fs from "fs";
import path from "path";

const questsPath = path.join(__dirname, "quests.json"); 
const quests = JSON.parse(fs.readFileSync(questsPath, "utf-8"));

let selectedQuest: { id: number; quest: string; followUps: any[] } | null = null;

const start = () => {
    console.log("Hey there! I am trapped in your device! help me experience the world by doing these quests~")
    console.log(questSelect())
}

const questSelect = () => {
    const selectedId = Math.floor(Math.random() * quests.length)
    selectedQuest = quests.find((q: { id: number; }) => q.id === selectedId)

    if (selectedQuest) {
        return { id: selectedQuest.id , quest: selectedQuest.quest, followUps: selectedQuest.followUps }
    }
    
    acceptQuest(true)
}

const subQuestSelect0 = () => {
    if (!selectedQuest) return null
    const followUps = selectedQuest.followUps

    const selectedSubQuest = followUps[0]

    console.log ({ parentId: selectedQuest.id, subQuest: selectedSubQuest})
}

const subQuestSelect1 = () => {
    if (!selectedQuest) return null
    const followUps = selectedQuest.followUps

    const selectedSubQuest = followUps[1]

    console.log ({ parentId: selectedQuest.id, subQuest: selectedSubQuest})
}

const acceptQuest = (questAccepted: boolean) => {
    if (questAccepted == true) {
        console.log("Yippie! Let me know when you are done!")
        completeQuest(true)
    }
    else if (questAccepted == false) {
        console.log("Aw, ok, let's try another one")
        questSelect()
    }
}

const completeQuest = (questComplete: boolean) => {
    if (questComplete == true) {
        subQuestSelect0()
    }
    else if (questComplete == false) {
        console.log("Ok, I'll wait. Or did you want to start a brand new quest?")
        questSelect()
    }
}

start()





