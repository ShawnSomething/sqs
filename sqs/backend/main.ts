// 1. start session with introductory things
// 2. a random quest is chosen for you
// 3. ability to reject quest
// 4. character gets sad
// 5. another random quest is chosen - not the same as the one that was just given to you
// 6. ability to accept quest
// 7. character happy when you accepted quest
// 8. complete quest - character happy
// 9. gives next quest in the hierarchy
// 10. repeat until no quests left
// 11. give another quests?
// 12. failed quest - character sad
// 13. repeat 11
// 14. yes - randomly generate another quest - not the same as the one just given
// 15. no - character sad and waiting for your return
// 16. upon return - repeat 11.

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

const questSelect = () => {
    const selectedId = Math.floor(Math.random() * 10)
    const selectedQuest = quests.find((q: { id: number; }) => q.id === selectedId)

    if (selectedQuest) {
        console.log(selectedId, selectedQuest.quest) 
    }
}

questSelect()





