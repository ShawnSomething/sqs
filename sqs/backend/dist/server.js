"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const main_1 = require("./main");
const app = (0, express_1.default)();
const PORT = 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/start", async (req, res) => {
    try {
        const step = await (0, main_1.start)(true);
        res.json({ step });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to start quest" });
    }
});
app.post("/choice", async (req, res) => {
    const { choice, questStepIndex } = req.body;
    try {
        const step = await (0, main_1.completeQuest)(choice, questStepIndex, true);
        res.json({ step });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to process choice" });
    }
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
