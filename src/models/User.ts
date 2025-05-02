export class User {
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
}

















