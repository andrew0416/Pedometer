"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stepController_1 = require("../controllers/stepController");
const router = (0, express_1.Router)();
router.post('/steps', stepController_1.stepController.postSteps); // 1. 사용자 걸음 수 저장
router.get('/steps', stepController_1.stepController.getStepsByDate); // 2. 오늘/특정 날짜 걸음 수 조회
router.get('/statistics', stepController_1.stepController.getStatistics); // 3. 기간별 통계 조회 (평균, 최댓값, 최솟값)
router.get('/weeklyStatistics', stepController_1.stepController.getWeeklyStatistics); // 6. 주별 평균 걸음 수
router.get('/hourlyStatistics', stepController_1.stepController.getHourlyStatistics); // 7. 시간대별 걸음 수 통계
exports.default = router;
