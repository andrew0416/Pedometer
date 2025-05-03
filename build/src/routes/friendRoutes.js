"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const friendController_1 = require("../controllers/friendController");
const router = (0, express_1.Router)();
// router.post('/friends', friendController.addFriend); // 8.1 친구 추가
// router.delete('/friends/:uid', friendController.deleteFriend); // 8.2 친구 삭제
// router.get('/ranking', friendController.getStepRanking); // 9. 친구 걸음 수 비교 (랭킹)
// 8.1 친구 추가
router.post('/friends', (req, res) => {
    friendController_1.friendController.addFriend(req, res);
});
// 8.2 친구 삭제
router.delete('/friends/:followee_id', (req, res) => {
    friendController_1.friendController.deleteFriend(req, res);
});
// 9. 친구 걸음 수 비교 (랭킹)
router.get('/ranking', (req, res) => {
    friendController_1.friendController.getStepRanking(req, res);
});
exports.default = router;
