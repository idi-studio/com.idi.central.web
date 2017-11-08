import { environment } from '../../environments/environment'
export class Runtime {
    public static readonly instance: Runtime = new Runtime()
    // public clientId: string = 'com.idi.central.web'
    // public clientKey: string = 'Y29tLmlkaS5jZW50cmFsLndlYjo2RUQ1QzQ3OC0xRjNBLTRDODItQjY2OC05OTkxN0Q2Nzc4NEU='
    // public user: any = null

    // baseUrl(): string {
    //     if (!/localhost/.test(document.location.host)) {
    //         return `http://${document.location.host.split(':')[0]}:50963`
    //     }
    //     return 'http://localhost:50963'
    // }

    set(key: string, value: string) {
        localStorage.setItem(key, value)
    }

    get(key: string): string {
        let value = localStorage.getItem(key)
        return value || '';
    }

    remove(key: string) {
        localStorage.removeItem(key)
    }

    profile(): any {
        return localStorage.getItem('profile') || null
    }

    authorized(): boolean {
        return this.get('authorized') == 'Y'
    }

    authorize(username: string, token: string) {
        this.set('username', username);
        this.set('token', token);
        this.set('authorized', 'Y');
    }

    unauthorize() {
        this.remove('username');
        this.remove('token');
        this.remove('profile');
        this.set('authorized', 'N');
    }

    config(): any {
        return environment.production ? this.production : this.development
    }

    private production = {
        clientId: 'com.idi.central.web',
        clientKey: 'Y29tLmlkaS5jZW50cmFsLndlYjo2RUQ1QzQ3OC0xRjNBLTRDODItQjY2OC05OTkxN0Q2Nzc4NEU=',
        baseUrl: 'http://www.idi-studio.com.cn',
        oauth: {
            github: { redirect_uri: 'http://www.idi-studio.com.cn/oauth/login' }
        }
    }

    private development = {
        clientId: 'com.idi.central.web',
        clientKey: 'Y29tLmlkaS5jZW50cmFsLndlYjo2RUQ1QzQ3OC0xRjNBLTRDODItQjY2OC05OTkxN0Q2Nzc4NEU=',
        baseUrl: 'http://localhost:50963',
        oauth: {
            github: { redirect_uri: 'http://localhost:4200/oauth/login' }
        }
    }
}
