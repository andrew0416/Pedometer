import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {
    id: number;
    email: string;
    password: string;
    salt: string;
    nickName: string;

    constructor(id: number, email: string, password: string, salt: string, nickName: string) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.salt = salt;
        this.nickName = nickName;
    }

    getId(): number{
        return this.id
    }

    getEmail(): string{
        return this.email
    }

    getNickName(): string{
        return this.nickName
    }
}

class Users {
    UserArr: User[];

    constructor(UserArr: User[] = []) {
        this.UserArr = UserArr;
    }

    async add(user: User): Promise<void> {
        await prisma.user.create({
            data: {
                email: user.getEmail(),
                password: user.password,
                salt: user.salt,
                nickname: user.getNickName(),
            },
        });
    }

    async getUsersInfo(user_ids: number[]): Promise<{ id: number; email: string; nickName: string }[]> {
        const users = await prisma.user.findMany({
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
    }
}

export { User, Users };













