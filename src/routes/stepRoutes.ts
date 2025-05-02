import { Router } from "express"; 
import { stepController } from "../controllers/stepController";

const router = Router();
 
router.post('/steps', stepController.postSteps); // 1. 사용자 걸음 수 저장
router.get('/steps', stepController.getStepsByDate); // 2. 오늘/특정 날짜 걸음 수 조회
router.get('/statistics', stepController.getStatistics); // 3. 기간별 통계 조회 (평균, 최댓값, 최솟값)
router.get('/weeklyStatistics', stepController.getWeeklyStatistics); // 6. 주별 평균 걸음 수
router.get('/hourlyStatistics', stepController.getHourlyStatistics); // 7. 시간대별 걸음 수 통계

export default router;