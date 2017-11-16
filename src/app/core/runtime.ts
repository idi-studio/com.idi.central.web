import { environment } from '../../environments/environment'
export class Runtime {
    public static readonly instance: Runtime = new Runtime()

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

        if (/localhost:4200/.test(document.location.host)) {
            return this.debug
        }

        if (/localhost/.test(document.location.host)) {
            return this.development
        }

        return this.production
        // return environment.production ? this.production : this.development
    }

    private production = {
        title: 'Central',
        clientId: 'com.idi.central.web',
        clientKey: '6ED5C4781F3A4C82B66899917D67784E',
        baseUrl: 'http://www.idi-studio.com.cn',
        oauth: {
            github: { redirect_uri: 'http://www.idi-studio.com.cn/oauth/login' }
        }
    }

    private development = {
        title: 'Central',
        clientId: 'com.idi.central.web',
        clientKey: '6ED5C4781F3A4C82B66899917D67784E',
        baseUrl: 'http://localhost',
        oauth: {
            github: { redirect_uri: 'http://localhost/oauth/login' }
        }
    }

    private debug = {
        title: 'Central',
        clientId: 'com.idi.central.web',
        clientKey: '6ED5C4781F3A4C82B66899917D67784E',
        baseUrl: 'http://localhost:50963',
        oauth: {
            github: { redirect_uri: 'http://localhost:50963/oauth/login' }
        }
    }
}
