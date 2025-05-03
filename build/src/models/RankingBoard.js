"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingBoard = void 0;
class RankingBoard {
    constructor() {
        this.rankHeap = [];
    }
    addUser(user_Id, stepCount) {
        this.rankHeap.push({ user_Id, stepCount });
        this.heapify();
    }
    heapify() {
        this.rankHeap.sort((a, b) => b.stepCount - a.stepCount); // 높은 순
    }
    getRanking() {
        return this.rankHeap;
    }
}
exports.RankingBoard = RankingBoard;
