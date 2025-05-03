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
exports.Steps = exports.Step = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Step {
    constructor(id, userId, stepCount, createdAt) {
        this.id = id;
        this.userId = userId;
        this.stepCount = stepCount;
        this.createdAt = createdAt;
    }
    getCount() {
        return this.stepCount;
    }
}
exports.Step = Step;
class Steps {
    constructor(stepArr = []) {
        this.stepArr = stepArr;
    }
    add(step) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.step.create({
                data: {
                    userId: step.userId,
                    stepCount: step.stepCount,
                    createdAt: step.createdAt,
                },
            });
        });
    }
    // userId와 date에 해당하는 step[] 반환
    filterByUserIdAndDate(userId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = new Date(date + 'T00:00:00.000Z');
            const end = new Date(date + 'T23:59:59.999Z');
            const steps = yield prisma.step.findMany({
                where: {
                    userId,
                    createdAt: {
                        gte: start,
                        lte: end,
                    },
                },
            });
            return steps.map(step => new Step(step.id, step.userId, step.stepCount, step.createdAt.toISOString()));
        });
    }
    // userId와 date range에 해당하는 step[] 반환
    filterByUserIdAndDateRange(userId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = new Date(startDate + 'T00:00:00.000Z');
            const end = new Date(endDate + 'T23:59:59.999Z');
            const steps = yield prisma.step.findMany({
                where: {
                    userId,
                    createdAt: {
                        gte: start,
                        lte: end,
                    },
                },
            });
            return steps.map(step => new Step(step.id, step.userId, step.stepCount, step.createdAt.toISOString()));
        });
    }
}
exports.Steps = Steps;
