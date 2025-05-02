"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const friendController_1 = require("../controllers/friendController");
const router = (0, express_1.Router)();
router.post('/friends', friendController_1.friendController.addFriend); // 8.1 친구 추가
router.delete('/friends/:uid', friendController_1.friendController.deleteFriend); // 8.2 친구 삭제
router.get('/ranking', friendController_1.friendController.getStepRanking); // 9. 친구 걸음 수 비교 (랭킹)
exports.default = router;
