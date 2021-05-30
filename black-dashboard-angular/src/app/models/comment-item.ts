export class CommentItem {
    constructor(idComment: Number, username: String, comment: String, date: String) {
        this.idComment = idComment;
        this.username = username;
        this.comment = comment;
        this.date = date;
    }

    idComment: Number;
    username: String;
    comment: String;
    date: String;
}