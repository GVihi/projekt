export class UserItem{
    constructor(
        idUser: Number,
        nickname: String,
        age: Number,
        username: String,
        password: String,
        email: String,
        accDate: Date
        ){
            this.idUser = idUser;
            this.nickname = nickname;
            this.age = age;
            this.username = username;
            this.password = password;
            this.email = email;
            this.accDate = accDate;

    }

    idUser: Number;
    nickname: String;
    age: Number;
    username: String;
    password: String;
    email: String;
    accDate: Date;

}