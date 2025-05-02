"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Steps = exports.Step = void 0;
class Step {
    constructor(id, uid, count, created_at) {
        this.id = id;
        this.uid = uid;
        this.count = count;
        this.created_at = created_at;
    }
}
exports.Step = Step;
class Steps {
    constructor(stepArr) {
        this.stepArr = stepArr;
    }
    add(step) {
        this.stepArr.push(step);
    }
}
exports.Steps = Steps;
