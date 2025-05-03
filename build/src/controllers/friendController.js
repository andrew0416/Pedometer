"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendController = exports.FriendController = void 0;
const Step_1 = require("../models/Step");
const RankingBoard_1 = require("../models/RankingBoard");
const prisma_1 = require("../../generated/prisma");
const User_1 = require("../models/User");
const Friend_1 = require("../models/Friend");
const userUtils_1 = require("../utils/userUtils");
const dateUtils_1 = require("../utils/dateUtils");
const userUtils_2 = require("../utils/userUtils");
class FriendController {
    // 8.1 친구 추가
    addFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // userId
            const userId = (0, userUtils_1.validateUserId)(req.body); // jwt
            if (typeof userId !== 'number') {
                const { status, error, target } = userId;
                return res.status(status).json({ error: error, target: target });
            }
            const { followee_id } = req.body;
            try {
                const validationError = (0, userUtils_2.validateFriendship)(userId, followee_id);
                if (validationError)
                    throw validationError;
                const friends = new Friend_1.Friends();
                const newFriend = new Friend_1.Friend(0, userId, followee_id);
                yield friends.add(newFriend);
                return res.status(200).json({ message: '친구가 성공적으로 추가되었습니다.' });
            }
            catch (error) {
                if (error instanceof prisma_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                    return res.status(400).json({ error: '이미 존재하는 친구 관계입니다.' });
                }
                if (error.status && error.message) {
                    return res.status(error.status).json({ error: error.message });
                }
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    // 8.2 친구 삭제
    deleteFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // userId
            const userId = (0, userUtils_1.validateUserId)(req.body); // jwt
            if (typeof userId !== 'number') {
                const { status, error, target } = userId;
                return res.status(status).json({ error: error, target: target });
            }
            const { followee_id } = req.params;
            const followeeId = parseInt(followee_id);
            try {
                const validationError = (0, userUtils_2.validateFriendship)(userId, followeeId);
                if (validationError)
                    throw validationError;
                const friends = new Friend_1.Friends();
                const toDelete = new Friend_1.Friend(0, userId, followeeId);
                const deletedCount = yield friends.delete(toDelete);
                if (deletedCount === 0) {
                    return res.status(400).json({ error: '해당 친구 관계가 존재하지 않습니다.' });
                }
                return res.status(200).json({ message: '친구 관계가 성공적으로 삭제되었습니다.' });
            }
            catch (error) {
                if (error.status && error.message) {
                    return res.status(error.status).json({ error: error.message });
                }
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    // 9. 친구 걸음 수 비교 (랭킹)
    getStepRanking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // userId
            const userId = (0, userUtils_1.validateUserId)(req.body); // jwt
            if (typeof userId !== 'number') {
                const { status, error, target } = userId;
                return res.status(status).json({ error: error, target: target });
            }
            // starDate, endDate
            const validatedDateRange = (0, dateUtils_1.validateDateRange)(req.query, true);
            if ('error' in validatedDateRange) {
                const { status, error, target } = validatedDateRange;
                return res.status(status).json({ error: error, target: target });
            }
            let { startDate, endDate } = validatedDateRange;
            const [users, steps, friends, ranking] = [new User_1.Users, new Step_1.Steps, new Friend_1.Friends, new RankingBoard_1.RankingBoard];
            let followee_ids = yield friends.findFollower(userId);
            followee_ids.push(userId); // 유저 본인도 추가해야함.
            let followeeInfos = yield users.getUsersInfo(followee_ids);
            addAllUserRanking(steps, ranking, followeeInfos, [startDate, endDate]);
            const result = ranking.getRanking(); // RankEntry[] 형태
            const dateRange = startDate === endDate ? startDate : `${startDate}~${endDate}`;
            const response = {
                date: dateRange,
                ranking: Object.fromEntries(result.map(entry => [entry.user_Id, entry.stepCount]))
            };
            res.status(200).json(response);
        });
    }
}
exports.FriendController = FriendController;
const addAllUserRanking = (steps, ranking, followeeInfos, dateRange) => __awaiter(void 0, void 0, void 0, function* () {
    const [startDate, endDate] = dateRange;
    for (const info of followeeInfos) {
        let userStepArr = yield steps.filterByUserIdAndDateRange(info.id, startDate, endDate);
        const counts = userStepArr.map(step => step.getCount());
        const average = counts.reduce((a, b) => a + b, 0) / counts.length;
        ranking.addUser(info.id, average);
    }
});
exports.friendController = new FriendController();
