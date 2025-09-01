
import * as fs from "fs";
import path from "path";

const questsPath = path.join(__dirname, "quests.json"); 
const quests = JSON.parse(fs.readFileSync(questsPath, "utf-8"));


type Quest = {
    id: number,
    quest: string,
    followUps: {
        id: string;
        quest: string
    } []
}

const start = () => {
    console.log("Hey there! I am trapped in your device! help me experience the world by doing these quests~")
    console.log(questSelect())
}

const questSelect = () => {
    const selectedId = Math.floor(Math.random() * 10)
    const selectedQuest = quests.find((q: { id: number; }) => q.id === selectedId)

    if (selectedQuest) {
        return { selectedId, quest: selectedQuest.quest }
    }

    acceptQuest(true)
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

const subQuestSelect = () => {
    const selectedSubId = Math.random() * 10
    const selectedSubQuest = quests.find((q: { id: number; }) => q.id === selectedSubId)
}

const completeQuest = (questComplete: boolean) => {

}

start()





