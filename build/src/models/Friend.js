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
exports.Friends = exports.Friend = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Friend {
    constructor(id, followee_id, follower_id) {
        this.id = id;
        this.followee_id = followee_id;
        this.follower_id = follower_id;
    }
}
exports.Friend = Friend;
class Friends {
    constructor(FriendArr = []) {
        this.FriendArr = FriendArr;
    }
    add(friend) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.friend.create({
                data: {
                    followeeId: friend.followee_id,
                    followerId: friend.follower_id,
                },
            });
        });
    }
    delete(friend) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield prisma.friend.deleteMany({
                where: {
                    followerId: friend.follower_id,
                    followeeId: friend.followee_id,
                },
            });
            return deleted.count;
        });
    }
    findFollower(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const friends = yield prisma.friend.findMany({
                where: {
                    followeeId: user_id,
                },
            });
            return friends.map(f => f.followerId);
        });
    }
}
exports.Friends = Friends;
