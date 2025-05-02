"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goals = exports.Goal = void 0;
class Goal {
    constructor(id, date, user_id, goal) {
        this.id = id;
        this.date = date;
        this.user_id = user_id;
        this.goal = goal;
    }
}
exports.Goal = Goal;
class Goals {
    constructor(goalArr) {
        this.goalArr = goalArr;
    }
    add(goal) {
        this.goalArr.push(goal);
    }
}
exports.Goals = Goals;
