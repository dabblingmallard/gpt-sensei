import { ExtensionContext, SecretStorage } from "vscode";

export class AuthStorage {
    private static _instance: AuthStorage;

    constructor(private secretStorage: SecretStorage) { }

    static init(context: ExtensionContext): void {
        /*
        Create instance of new AuthStorage.
        */
        AuthStorage._instance = new AuthStorage(context.secrets);
    }

    static get instance(): AuthStorage {
        /*
        Getter of our AuthStorage existing instance.
        */
        return AuthStorage._instance;
    }

    async storeAuthData(token?: string): Promise<void> {
        /*
        Update values in bugout_auth secret storage.
        */
        if (token) {
            this.secretStorage.store("gptSensei_token", token);
        }
    }

    async getAuthData(): Promise<string | undefined> {
        /*
        Retrieve data from secret storage.
        */
        return await this.secretStorage.get("gptSensei_token");
    }
}