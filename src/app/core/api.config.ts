export class API {
    public static readonly instance: API = new API();

    public baseUrl: string = "http://localhost:50963";
    public clientKey: string = "Y29tLmlkaS5jZW50cmFsLndlYjo2RUQ1QzQ3OC0xRjNBLTRDODItQjY2OC05OTkxN0Q2Nzc4NEU=";

    private API() { }

    set(key: string, value: string) {
        localStorage.setItem(key, value)
        // console.log(`set cache with key: '${key}', value: '${value}'`);
    }

    get(key: string): string {
        let value = localStorage.getItem(key)
        // console.log(`get cache value: '${value}' with key: '${key}'`);
        return value || "";
    }

    remove(key: string) {
        localStorage.removeItem(key)
    }
}
