import { Router } from "express"; 
import { friendController } from "../controllers/friendController";

const router = Router();

router.post('/friends', friendController.addFriend); // 8.1 친구 추가
router.delete('/friends/:uid', friendController.deleteFriend); // 8.2 친구 삭제
router.get('/ranking', friendController.getStepRanking); // 9. 친구 걸음 수 비교 (랭킹)

export default router;