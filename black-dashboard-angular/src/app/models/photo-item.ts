export class PhotoItem {
    constructor(idPhoto: Number, title: String, path: String, date: String, description: String, longitude: Number, latitude: Number) {
        this.idPhoto = idPhoto;
        this.title = title;
        this.path = path;
        this.date = date;
        this.description = description;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    idPhoto: Number;
    title: String;
    path: String;
    date: String;
    description: String;
    longitude: Number;
    latitude: Number;
}