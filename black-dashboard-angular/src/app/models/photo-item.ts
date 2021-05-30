export class PhotoItem {
    constructor(idPhoto: Number, title: String, path: String, date: String) {
        this.idPhoto = idPhoto;
        this.title = title;
        this.path = path;
        this.date = date;
    }

    idPhoto: Number;
    title: String;
    path: String;
    date: String;
}