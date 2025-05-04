"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserId = validateUserId;
exports.validateFriendship = validateFriendship;
const defineError_1 = require("./defineError");
function validateUserId(body) {
    const userIdString = body.userId;
    if (!userIdString) {
        return Object.assign(Object.assign({}, defineError_1.MISSING_PARAMETER), { target: 'userId' });
    }
    const userId = parseInt(userIdString);
    if (isNaN(userId)) {
        return Object.assign(Object.assign({}, defineError_1.INVALID_PARAMETER), { target: 'userId' });
    }
    return userId;
}
function validateFriendship(userId, followeeId) {
    if (!followeeId) {
        return Object.assign(Object.assign({}, defineError_1.MISSING_PARAMETER), { target: 'followeeId' });
    }
    if (userId === followeeId) {
        return Object.assign(Object.assign({}, defineError_1.INVALID_PARAMETER), { target: 'followeeId' });
    }
    return null;
}
