export class ResultItem {
    constructor(photo: string, similarity: Number, path: string) {
        this.photo = photo;
        this.similarity = similarity;
        this.path = path;
    }

    photo: string;
    path: string;
    similarity: Number;
}