import { Client, Account, Databases, Avatars } from "appwrite"

export const appwriteClient = new Client();

appwriteClient
    .setLocale("es")
    // @ts-ignore
    .setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT)
    // @ts-ignore
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

// @ts-ignore
export const createAppwriteClient = () => new Client().setLocale("es").setEndpoint(process.env.API_ENDPOINT).setProject(process.env.APPWRITE_PROJECT_ID);

export const appwriteAccount = new Account(appwriteClient);

export const appwriteDatabase = new Databases(appwriteClient);

export const getInitials = () => {
    const result = new Avatars(appwriteClient).getInitials();
    console.log(result)
    return result;
}

// Register User
/*appwriteAccount.create(ID.unique(), "santosalarcon86@gmail.com", "Pepe12345", "Santos Alarcón Asensio")
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });*/
