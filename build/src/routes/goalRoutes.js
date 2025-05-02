"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const goalController_1 = require("../controllers/goalController");
const router = (0, express_1.Router)();
router.put('/stepGoals', goalController_1.goalController.setGoal); // 4. 현재의 목표 걸음 수 설정
router.get('/stepGoals', goalController_1.goalController.checkGoal); // 5. 목표 달성 여부 확인
exports.default = router;
