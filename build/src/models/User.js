"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, email, password, salt, nickName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.salt = salt;
        this.nickName = nickName;
    }
}
exports.User = User;
