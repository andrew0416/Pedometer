import { Router } from "express"; 
import { goalController } from "../controllers/goalController";

const router = Router();

router.put('/stepGoals', goalController.setGoal); // 4. 현재의 목표 걸음 수 설정
router.get('/stepGoals', goalController.checkGoal); // 5. 목표 달성 여부 확인

export default router;