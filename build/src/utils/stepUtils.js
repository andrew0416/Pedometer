"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStepCount = validateStepCount;
const defineError_1 = require("./defineError");
function validateStepCount(body) {
    const stepCountString = body.stepCount;
    if (!stepCountString) {
        return Object.assign(Object.assign({}, defineError_1.MISSING_PARAMETER), { target: 'stepCount' });
    }
    const stepCount = parseInt(stepCountString);
    if (isNaN(stepCount)) {
        return Object.assign(Object.assign({}, defineError_1.INVALID_PARAMETER), { target: 'stepCount' });
    }
    return stepCount;
}
