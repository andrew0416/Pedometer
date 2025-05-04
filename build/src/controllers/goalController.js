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
exports.goalController = exports.GoalController = void 0;
const Step_1 = require("../models/Step");
const Goal_1 = require("../models/Goal");
const prisma_1 = require("../../generated/prisma");
const userUtils_1 = require("../utils/userUtils");
const prisma = new prisma_1.PrismaClient();
class GoalController {
    // 4. 현재의 목표 걸음 수 설정
    setGoal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (0, userUtils_1.validateUserId)(req.body); // jwt
            if (typeof userId !== 'number') {
                const { status, error, target } = userId;
                return res.status(status).json({ error: error, target: target });
            }
            const goalCount = parseInt(req.body.goalCount);
            if (!goalCount) {
                return res.status(400).json({ error: 'Invalid data' });
            }
            const today = new Date();
            const goals = new Goal_1.Goals();
            const existingGoal = yield goals.filterByUserIdAndDate(userId, today.toISOString().split('T')[0]);
            if (existingGoal.length > 0) {
                goals.updateGoal(userId, today.toISOString().split('T')[0], goalCount);
                return res.status(200).json({ message: '목표가 업데이트 되었습니다.' });
            }
            else {
                const newGoal = new Goal_1.Goal(0, today, userId, goalCount);
                goals.add(newGoal);
                return res.status(201).json({ message: '목표 설정이 완료되었습니다.' });
            }
        });
    }
    // 5. 목표 달성 여부 확인
    checkGoal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (0, userUtils_1.validateUserId)(req.body); // jwt
            if (typeof userId !== 'number') {
                const { status, error, target } = userId;
                return res.status(status).json({ error: error, target: target });
            }
            const today = new Date().toISOString().split('T')[0];
            let steps = new Step_1.Steps();
            let goals = new Goal_1.Goals();
            // steps와 goals 배열에서 해당하는 userId의 오늘 날짜 데이터 필터링
            const filteredSteps = yield steps.filterByUserIdAndDate(userId, today);
            const filteredGoals = yield goals.filterByUserIdAndDate(userId, today);
            // totalSteps와 목표 걸음 수 구하기 (없으면 0으로 설정)
            const totalSteps = filteredSteps.length > 0 ? filteredSteps.reduce((sum, step) => sum + step.stepCount, 0) : 0;
            const stepGoal = filteredGoals.length > 0 ? filteredGoals[filteredGoals.length - 1].goal : 0;
            // 목표 달성 여부 확인
            const achieveGoal = totalSteps >= stepGoal;
            res.status(200).json({
                achieve_goal: achieveGoal,
                goal: stepGoal,
                current_steps: totalSteps
            });
        });
    }
}
exports.GoalController = GoalController;
exports.goalController = new GoalController();
