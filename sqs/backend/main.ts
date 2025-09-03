
import * as fs from "fs";
import path from "path";
import inquirer from "inquirer"

const questsPath = path.join(__dirname, "quests.json"); 
const quests = JSON.parse(fs.readFileSync(questsPath, "utf-8"));

let selectedQuest: { id: number; quest: string; followUps: any[] } | null = null;

const start = () => {
    console.log("Hey there! I am trapped in your device! help me experience the wonders of life by doing these quests~")
    console.log(questSelect())
}

const questSelect = async () => {
    const selectedId = Math.floor(Math.random() * quests.length)
    selectedQuest = quests.find((q: { id: number; }) => q.id === selectedId)

    console.log ({ id: selectedQuest?.id , quest: selectedQuest?.quest})
    
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Will you help me experience this?",
            choices: ["Complete", "Reject"],
        },
    ])

    await completeQuest(answer.choice)
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

const completeQuest = (choice: string) => {
    if (choice === "Complete") {
        subQuestSelect0()
    }
    else if (choice == "Reject") {
        console.log("Aw... Did you want to start a brand new quest?")
        questSelect()
    }
}

start()






