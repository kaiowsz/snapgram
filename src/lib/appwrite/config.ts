import { Client, Account, Storage, Databases, Avatars } from "appwrite" 

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID
    url: import.meta.env.VITE_APPWRITE_URL
}

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

export const client = new Client();
export const account = new Account(client);
export const databases = new Storage(client);
export const storage = new Databases(client);
export const avatars = new Avatars(client);