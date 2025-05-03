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

    constructor(UserArr: User[]) {
        this.UserArr = UserArr;
    }

    add(user: User): void {
        this.UserArr.push(user);
    }

    getUsersInfo(user_ids: number[]): { id: number; email: string; nickName: string }[] {
        return this.UserArr
        .filter(user => user_ids.includes(user.getId()))
        .map(user => ({
            id: user.getId(),
            email: user.getEmail(),
            nickName: user.getNickName()
        }));
    }
}

export { User, Users };













