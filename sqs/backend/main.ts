
import * as fs from "fs";
import path from "path";
import inquirer from "inquirer"

const questsPath = path.join(__dirname, "quests.json"); 
const quests = JSON.parse(fs.readFileSync(questsPath, "utf-8"));

let selectedQuest: { id: number; quest: string; followUps: any[] } | null = null;

export const start = () => {
    console.log("Hey there! I am trapped in your device! help me experience the wonders of life by doing these quests~")
    console.log(questSelect())
}

export const questSelect = async () => {
    const ids = quests.map((q: { id: number; }) => q.id)
    const selectedId = ids[Math.floor(Math.random() * ids.length)]
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

    await completeQuest(answer.choice, 0)
}

export const subQuestSelect = async (index: number) => {
    if (!selectedQuest) return null
    const followUps = selectedQuest.followUps
    const selectedSubQuest = followUps[index]

    if (!selectedSubQuest) {
        console.log ("All Quests Done! Thanks for helping me expeirence human life.")
        return
    }

    console.log ({ parentId: selectedQuest.id, subQuest: selectedSubQuest})

    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: index === 0 ? "What's next?" : "I feel so alive!",
            choices: ["Complete", "Reject"],
        },
    ])

    await completeQuest(answer.choice, index + 1)
}

export const completeQuest = (choice: string, nextStep: number) => {
    if (choice === "Complete")  {
        subQuestSelect(nextStep)
    }
    else if (choice == "Reject") {
        console.log("Aw... Did you want to start a brand new quest?")
        questSelect()
    }
}

start()






