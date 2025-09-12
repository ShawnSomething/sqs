"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeQuest = exports.subQuestSelect = exports.start = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const state_1 = require("./state");
const questsPath = path_1.default.join(__dirname, "quests.json");
const quests = JSON.parse(fs.readFileSync(questsPath, "utf-8"));
let selectedQuest = null;
let questStep = 0;
const start = async (isWeb = false) => {
    const msg = "Hey there! I am trapped in your device! help me experience the wonders of life by doing these quests~";
    console.log(msg);
    (0, state_1.setOutput)(msg);
    const ids = quests.map((q) => q.id);
    const selectedId = ids[Math.floor(Math.random() * ids.length)];
    selectedQuest = quests.find((q) => q.id === selectedId);
    questStep = 0;
    const questMsg = { id: selectedQuest?.id, quest: selectedQuest?.quest, followUps: selectedQuest?.followUps };
    console.log(questMsg);
    (0, state_1.setOutput)(JSON.stringify(questMsg));
    if (!isWeb) {
        const answer = await inquirer_1.default.prompt([
            { type: "list", name: "choice", message: "Will you help me experience this?", choices: ["Complete", "Reject"] }
        ]);
        await (0, exports.completeQuest)(answer.choice, questStep, false);
    }
    else {
        return questMsg;
    }
};
exports.start = start;
const subQuestSelect = async (stepIndex, isWeb = false) => {
    if (!selectedQuest)
        return null;
    const followUps = selectedQuest.followUps;
    const selectedSubQuest = followUps[stepIndex];
    if (!selectedSubQuest) {
        const doneMsg = "All Quests Done! Thanks for helping me experience human life.";
        console.log(doneMsg);
        (0, state_1.setOutput)(doneMsg);
        if (isWeb)
            return { done: true, message: doneMsg };
        return;
    }
    const subMsg = { parentId: selectedQuest.id, subQuest: selectedSubQuest };
    console.log(subMsg);
    (0, state_1.setOutput)(JSON.stringify(subMsg));
    if (!isWeb) {
        const answer = await inquirer_1.default.prompt([
            { type: "list", name: "choice", message: stepIndex === 0 ? "What's next?" : "I feel so alive!", choices: ["Complete", "Reject"] }
        ]);
        await (0, exports.completeQuest)(answer.choice, stepIndex + 1, false);
    }
    else {
        return subMsg;
    }
};
exports.subQuestSelect = subQuestSelect;
const completeQuest = async (choice, stepIndex, isWeb = true) => {
    if (choice === "Complete") {
        if (!selectedQuest) {
            return (0, exports.start)(isWeb);
        }
        if (stepIndex >= selectedQuest.followUps.length) {
            const doneMsg = "All Quests Done! Thanks for helping me experience human life.";
            console.log(doneMsg);
            (0, state_1.setOutput)(doneMsg);
            selectedQuest = null;
            questStep = 0;
            if (isWeb)
                return { done: true, message: doneMsg };
            return;
        }
        return (0, exports.subQuestSelect)(stepIndex, isWeb);
    }
    else if (choice === "Reject") {
        const rejectMsg = "Aw... Did you want to start a brand new quest?";
        console.log(rejectMsg);
        (0, state_1.setOutput)(rejectMsg);
        selectedQuest = null;
        questStep = 0;
        return (0, exports.start)(isWeb);
    }
};
exports.completeQuest = completeQuest;
if (require.main === module) {
    (0, exports.start)(false);
}
