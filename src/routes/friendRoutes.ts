import { Router } from "express"; 
import { friendController } from "../controllers/friendController";

const router = Router();

// router.post('/friends', friendController.addFriend); // 8.1 친구 추가
// router.delete('/friends/:uid', friendController.deleteFriend); // 8.2 친구 삭제
// router.get('/ranking', friendController.getStepRanking); // 9. 친구 걸음 수 비교 (랭킹)

// 8.1 친구 추가
router.post('/friends', (req, res) => {
    friendController.addFriend(req, res);
}); 

// 8.2 친구 삭제
router.delete('/friends/:followee_id', (req, res) => {
    friendController.deleteFriend(req, res)
}); 

// 9. 친구 걸음 수 비교 (랭킹)
router.get('/ranking', (req, res) => {
    friendController.getStepRanking(req, res)
}); 

export default router;