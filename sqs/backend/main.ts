
import * as fs from "fs";
import path from "path";

const questsPath = path.join(__dirname, "quests.json"); 
const quests = JSON.parse(fs.readFileSync(questsPath, "utf-8"));

const start = () => {
    console.log("Hey there! I am trapped in your device! help me experience the world by doing these quests~")
    console.log(questSelect())
}

const questSelect = () => {
    const selectedId = Math.floor(Math.random() * quests.length)
    const selectedQuest = quests.find((q: { id: number; }) => q.id === selectedId)

    if (selectedQuest) {
        return { selectedId, quest: selectedQuest.quest, followUps: selectedQuest.followUps }
    }
    
    acceptQuest(true)
}

const subQuestSelect0 = () => {
    const parentQuest = questSelect()
    const followUps = parentQuest?.followUps

    const selectedSubQuest = followUps[0]

    console.log ({ parentId: parentQuest?.selectedId, subQuest: selectedSubQuest})
}

const subQuestSelect1 = () => {
    const parentQuest = questSelect()
    const followUps = parentQuest?.followUps

    const selectedSubQuest = followUps[1]

    console.log ({ parentId: parentQuest?.selectedId, subQuest: selectedSubQuest})
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

subQuestSelect1()





