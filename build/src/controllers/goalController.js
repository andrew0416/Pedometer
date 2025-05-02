"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalController = exports.GoalController = void 0;
class GoalController {
    // 4. 현재의 목표 걸음 수 설정
    setGoal(req, res) {
        console.log('현재의 목표 걸음 수 설정');
    }
    // 5. 목표 달성 여부 확인
    checkGoal(req, res) {
        console.log('목표 달성 여부 확인');
    }
}
exports.GoalController = GoalController;
exports.goalController = new GoalController();
