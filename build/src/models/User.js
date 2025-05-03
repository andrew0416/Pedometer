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
exports.Users = exports.User = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class User {
    constructor(id, email, password, salt, nickName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.salt = salt;
        this.nickName = nickName;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getNickName() {
        return this.nickName;
    }
}
exports.User = User;
class Users {
    constructor(UserArr = []) {
        this.UserArr = UserArr;
    }
    add(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.create({
                data: {
                    email: user.getEmail(),
                    password: user.password,
                    salt: user.salt,
                    nickname: user.getNickName(),
                },
            });
        });
    }
    getUsersInfo(user_ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany({
                where: {
                    id: {
                        in: user_ids,
                    },
                },
                select: {
                    id: true,
                    email: true,
                    nickname: true,
                },
            });
            return users.map(user => ({
                id: user.id,
                email: user.email,
                nickName: user.nickname,
            }));
        });
    }
}
exports.Users = Users;
