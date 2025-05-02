"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendController = exports.FriendController = void 0;
class FriendController {
    // 8.1 친구 추가
    addFriend(req, res) {
        console.log('친구 추가');
    }
    // 8.2 친구 삭제
    deleteFriend(req, res) {
        console.log('친구 삭제');
    }
    // 9. 친구 걸음 수 비교 (랭킹)
    getStepRanking(req, res) {
        const { startDate, endDate } = req.query;
        console.log('랭킹 조회');
    }
}
exports.FriendController = FriendController;
exports.friendController = new FriendController();
