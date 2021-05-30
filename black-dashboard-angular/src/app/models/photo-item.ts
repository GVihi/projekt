export class PhotoItem {
    constructor(idPhoto: Number, title: String, path: String, date: String, description: String) {
        this.idPhoto = idPhoto;
        this.title = title;
        this.path = path;
        this.date = date;
        this.description = description;
    }

    idPhoto: Number;
    title: String;
    path: String;
    date: String;
    description: String;
}