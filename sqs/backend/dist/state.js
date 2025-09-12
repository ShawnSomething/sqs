"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutput = exports.setOutput = void 0;
let lastOutput = null;
const setOutput = (msg) => {
    lastOutput = msg;
};
exports.setOutput = setOutput;
const getOutput = () => lastOutput;
exports.getOutput = getOutput;
