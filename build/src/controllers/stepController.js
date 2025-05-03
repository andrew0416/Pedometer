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
exports.stepController = exports.StepController = void 0;
const Step_1 = require("../models/Step");
const prisma_1 = require("../../generated/prisma");
const userUtils_1 = require("../utils/userUtils");
const dateUtils_1 = require("../utils/dateUtils");
const stepUtils_1 = require("../utils/stepUtils");
const prisma = new prisma_1.PrismaClient();
class StepController {
    // 1. 사용자 걸음 수 저장
    postSteps(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (0, userUtils_1.validateUserId)(req.body); // 
                const stepCount = (0, stepUtils_1.validateStepCount)(req.body);
                if (typeof userId !== 'number') {
                    throw userId;
                }
                if (typeof stepCount !== 'number') {
                    throw stepCount;
                }
                const steps = new Step_1.Steps();
                const newStep = new Step_1.Step(0, userId, stepCount, new Date().toISOString());
                yield steps.add(newStep);
                return res.status(200).json({ message: '걸음 수 저장 성공' });
            }
            catch (err) {
                if (err.status && err.error) {
                    return res.status(err.status).json({ error: err.err, target: err.target });
                }
                return res.status(500).json({ error: '알 수 없는 에러', detail: err });
            }
        });
    }
    // 2. 오늘/특정 날짜 걸음 수 조회
    getStepsByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // userId
            const userId = (0, userUtils_1.validateUserId)(req.body); // jwt
            if (typeof userId !== 'number') {
                const { status, error, target } = userId;
                return res.status(status).json({ error: error, target: target });
            }
            // date
            const date = (0, dateUtils_1.validateDate)(req.query);
            if (typeof date !== 'string') {
                const { status, error, target } = date;
                return res.status(status).json({ error: error, target: target });
            }
            let steps = new Step_1.Steps(); // 임시 사용
            // steps 배열에서 해당 날짜의 걸음 수 찾기
            const stepsOnDate = yield steps.filterByUserIdAndDate(userId, date);
            // 총합 걸음 수(걸음 수가 존재하지 않을 경우 0)
            const totalSteps = stepsOnDate.reduce((sum, step) => sum + step.getCount(), 0);
            return res.status(200).json({
                date: date,
                steps: totalSteps
            });
        });
    }
    // 3. 기간별 통계 조회 (평균, 최댓값, 최솟값)
    getStatistics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // userId
            const userId = (0, userUtils_1.validateUserId)(req.body); // jwt
            if (typeof userId !== 'number') {
                const { status, error, target } = userId;
                return res.status(status).json({ error: error, target: target });
            }
            // startDate, endDate
            const validatedDateRange = (0, dateUtils_1.validateDateRange)(req.query, false);
            if ('error' in validatedDateRange) {
                const { status, error, target } = validatedDateRange;
                return res.status(status).json({ error: error, target: target });
            }
            const { startDate, endDate } = validatedDateRange;
            let steps = new Step_1.Steps();
            const filtered = yield steps.filterByUserIdAndDateRange(userId, startDate, endDate);
            if (filtered.length === 0) {
                return res.status(404).json({ error: '해당 기간에 데이터가 없습니다.' });
            }
            const counts = filtered.map(step => step.getCount());
            const average = counts.reduce((a, b) => a + b, 0) / counts.length;
            const max = Math.max(...counts);
            const min = Math.min(...counts);
            return res.status(200).json({
                average: average,
                max: max,
                min: min
            });
        });
    }
    // 6. 주별 평균 걸음 수
    getWeeklyStatistics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // userId
            const userId = (0, userUtils_1.validateUserId)(req.body); // jwt
            if (typeof userId !== 'number') {
                const { status, error, target } = userId;
                return res.status(status).json({ error: error, target: target });
            }
            const steps = new Step_1.Steps();
            const currentDate = new Date();
            // 월요일 기준 이번 주 시작일 구하기
            const startOfWeek = (0, dateUtils_1.getStartOfWeek)();
            // 날짜 변환
            const formatDate = (date) => date.toISOString().split('T')[0];
            const [startDate, endDate] = [startOfWeek, currentDate].map(formatDate);
            const filtered = yield steps.filterByUserIdAndDateRange(userId, startDate, endDate);
            const counts = yield filtered.map(step => step.getCount());
            const average = counts.reduce((a, b) => a + b, 0) / counts.length;
            res.status(200).json({
                weekly_average: average,
            });
        });
    }
    // 7. 시간대별 걸음 수 통계
    getHourlyStatistics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // userId
            const userId = (0, userUtils_1.validateUserId)(req.body); // jwt
            if (typeof userId !== 'number') {
                const { status, error, target } = userId;
                return res.status(status).json({ error: error, target: target });
            }
            // date
            const date = (0, dateUtils_1.validateDate)(req.query);
            if (typeof date !== 'string') {
                const { status, error, target } = date;
                return res.status(status).json({ error: error, target: target });
            }
            const steps = new Step_1.Steps();
            const hourlyArr = {};
            for (let i = 0; i < 24; i++) {
                const key = `${i.toString().padStart(2, '0')}~${(i + 1).toString().padStart(2, '0')}`;
                hourlyArr[key] = 0;
            }
            // 날짜 필터링
            const filtered = yield steps.filterByUserIdAndDate(userId, date);
            // 시간대별 집계
            for (const step of filtered) {
                const hour = new Date(step.createdAt).getHours();
                const key = `${hour.toString().padStart(2, '0')}~${(hour + 1).toString().padStart(2, '0')}`;
                hourlyArr[key] += step.getCount();
            }
            return res.status(200).json({
                date: date,
                hourlySteps: hourlyArr
            });
        });
    }
}
exports.StepController = StepController;
exports.stepController = new StepController();
