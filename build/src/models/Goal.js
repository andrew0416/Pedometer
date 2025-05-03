"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goals = exports.Goal = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Goal {
    constructor(id, date, uid, goal) {
        this.id = id;
        this.created_at = date;
        this.uid = uid;
        this.goal = goal;
    }
}
exports.Goal = Goal;
class Goals {
    constructor(GoalArr = []) {
        this.GoalArr = GoalArr;
    }
    add(goal) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.goal.create({
                data: {
                    created_at: goal.created_at,
                    uid: goal.uid,
                    goal: goal.goal,
                },
            });
        });
    }
    updateGoal(userId, date, goalValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = new Date(date + 'T00:00:00.000Z');
            const end = new Date(date + 'T23:59:59.999Z');
            yield prisma.goal.updateMany({
                where: {
                    uid: userId,
                    created_at: {
                        gte: start,
                        lte: end,
                    },
                },
                data: {
                    goal: goalValue,
                },
            });
        });
    }
    filterByUserIdAndDate(userId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = new Date(date + 'T00:00:00.000Z');
            const end = new Date(date + 'T23:59:59.999Z');
            const goals = yield prisma.goal.findMany({
                where: {
                    uid: userId,
                    created_at: {
                        gte: start,
                        lte: end,
                    },
                },
            });
            return goals.map(goal => new Goal(goal.id, goal.created_at.toISOString().split('T')[0], goal.uid, goal.goal));
        });
    }
}
exports.Goals = Goals;
