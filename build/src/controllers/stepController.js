"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepController = exports.StepController = void 0;
class StepController {
    // 1. 사용자 걸음 수 저장
    postSteps(req, res) {
        console.log('사용자 걸음 수 저장');
    }
    // 2. 오늘/특정 날짜 걸음 수 조회
    getStepsByDate(req, res) {
        const { date } = req.query;
        console.log('오늘/특정 날짜 걸음 수 조회');
    }
    // 3. 기간별 통계 조회 (평균, 최댓값, 최솟값)
    getStatistics(req, res) {
        const { startDate, endDate } = req.query;
        console.log('기간별 통계 조회');
    }
    // 6. 주별 평균 걸음 수
    getWeeklyStatistics(req, res) {
        console.log('주별 평균 걸음 수');
    }
    // 7. 시간대별 걸음 수 통계
    getHourlyStatistics(req, res) {
        const { date } = req.query;
        console.log('시간대별 걸음 수 통계');
    }
}
exports.StepController = StepController;
exports.stepController = new StepController();
