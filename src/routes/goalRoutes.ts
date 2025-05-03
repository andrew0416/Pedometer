import { Router } from "express"; 
import { goalController } from "../controllers/goalController";

const router = Router();

// 4. 현재의 목표 걸음 수 설정
router.put('/stepGoals', (req, res) => {
    goalController.setGoal(req, res);
}); 

// 5. 목표 달성 여부 확인
router.get('/stepGoals', (req, res) => {
    goalController.checkGoal(req, res)
}); 


export default router;