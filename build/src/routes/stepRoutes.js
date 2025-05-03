"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stepController_1 = require("../controllers/stepController");
const router = (0, express_1.Router)();
// 1. 사용자 걸음 수 저장
router.post('/steps', (req, res) => {
    stepController_1.stepController.postSteps(req, res);
});
// 2. 오늘/특정 날짜 걸음 수 조회
router.get('/steps', (req, res) => {
    stepController_1.stepController.getStepsByDate(req, res);
});
// 3. 기간별 통계 조회 (평균, 최댓값, 최솟값)
router.get('/statistics', (req, res) => {
    stepController_1.stepController.getStatistics(req, res);
});
// 6. 주별 평균 걸음 수
router.get('/weeklyStatistics', (req, res) => {
    stepController_1.stepController.getWeeklyStatistics(req, res);
});
// 7. 시간대별 걸음 수 통계
router.get('/hourlyStatistics', (req, res) => {
    stepController_1.stepController.getHourlyStatistics(req, res);
});
exports.default = router;
