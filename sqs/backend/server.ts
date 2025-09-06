import express from "express"
import cors from "cors"
import {start, completeQuest} from "./main"

const app = express()
const PORT = 4000
app.use(cors())
app.use(express.json())

app.post("/start", (req, res) => {
    const startQuest = start()
    res.json({step: startQuest})
})

app.post("/choice", (req, res) => {
    const {choice} = req.body
    const { questStep } = req.body
    const result = completeQuest(choice, questStep)
    res.json(result)
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})