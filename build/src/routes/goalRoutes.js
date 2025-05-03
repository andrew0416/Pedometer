"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const goalController_1 = require("../controllers/goalController");
const router = (0, express_1.Router)();
// 4. 현재의 목표 걸음 수 설정
router.put('/stepGoals', (req, res) => {
    goalController_1.goalController.setGoal(req, res);
});
// 5. 목표 달성 여부 확인
router.get('/stepGoals', (req, res) => {
    goalController_1.goalController.checkGoal(req, res);
});
exports.default = router;
