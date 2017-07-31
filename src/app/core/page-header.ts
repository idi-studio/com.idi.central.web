export class PageHeader {
    title: string;
    path: string[];

    constructor(title: string, path: string[]) {
        this.title = title;
        this.path = path;
    }
}