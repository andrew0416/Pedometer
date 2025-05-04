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
    getDateTimeString() {
        const yyyy = this.created_at.getFullYear();
        const mm = String(this.created_at.getMonth() + 1).padStart(2, '0');
        const dd = String(this.created_at.getDate()).padStart(2, '0');
        const hh = String(this.created_at.getHours()).padStart(2, '0');
        const mi = String(this.created_at.getMinutes()).padStart(2, '0');
        const ss = String(this.created_at.getSeconds()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
    }
}
exports.Goal = Goal;
class Goals {
    constructor(GoalArr = []) {
        this.GoalArr = GoalArr;
    }
    add(goal) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.$executeRaw `
            INSERT INTO "Goal" ("uid", "goal", "created_at")
            VALUES (${goal.uid}, ${goal.goal}, ${goal.getDateTimeString()})
        `;
        });
    }
    updateGoal(userId, date, goalValue) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.$executeRaw `
            UPDATE "Goal"
            SET "goal" = ${goalValue}
            WHERE "uid" = ${userId}
            AND DATE("created_at") = ${date}
        `;
        });
    }
    filterByUserIdAndDate(userId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const goals = yield prisma.$queryRaw `
        SELECT * FROM "Goal"
        WHERE "uid" = ${userId}
        AND DATE("created_at") = ${date}
    `;
            return goals.map(goal => new Goal(goal.id, goal.created_at, goal.uid, goal.goal));
        });
    }
}
exports.Goals = Goals;
