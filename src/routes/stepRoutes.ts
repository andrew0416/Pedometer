import { Router } from "express"; 
import { stepController } from "../controllers/stepController";

const router = Router();

// 1. 사용자 걸음 수 저장
router.post('/steps', (req, res) => {
    stepController.postSteps(req, res);
});

// 2. 오늘/특정 날짜 걸음 수 조회
router.get('/steps', (req, res) => { 
    stepController.getStepsByDate(req, res);
});

 // 3. 기간별 통계 조회 (평균, 최댓값, 최솟값)
router.get('/statistics', (req, res) => { 
    stepController.getStatistics(req, res); 
}); 

// 6. 주별 평균 걸음 수
router.get('/weeklyStatistics', (req, res) => {
    stepController.getWeeklyStatistics(req, res);
}); 

// 7. 시간대별 걸음 수 통계
router.get('/hourlyStatistics', (req, res) => {
    stepController.getHourlyStatistics(req, res);
});

export default router;