"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friends = exports.Friend = void 0;
class Friend {
    constructor(id, followee_id, follower_id) {
        this.id = id;
        this.followee_id = followee_id;
        this.follower_id = follower_id;
    }
}
exports.Friend = Friend;
class Friends {
    constructor(FriendArr) {
        this.FriendArr = FriendArr;
    }
    add(friend) {
        this.FriendArr.push(friend);
    }
}
exports.Friends = Friends;
