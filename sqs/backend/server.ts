import express from "express"
import cors from "cors"
import {start, completeQuest} from "./main"
import { getOutput } from "./state"

const app = express()
const PORT = 4000
app.use(cors())
app.use(express.json())

app.post("/start", async (req, res) => {
    try {
        const step = await start(true);
        res.json({ step });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to start quest" });
    }
})

app.post("/choice", async (req, res) => {
  const { choice, questStepIndex } = req.body;
  try {
    const step = await completeQuest(choice, questStepIndex, true);
    res.json({ step });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process choice" });
  }
});

app.listen(PORT, "0.0.0.0/0", () => {
    console.log(`Server running at http://0.0.0.0/0:${PORT}`)
})