import { Client, Account } from "appwrite"

export const appwriteClient = new Client();

appwriteClient
    .setLocale("es")
    // @ts-ignore
    .setEndpoint(process.env.API_ENDPOINT)
    // @ts-ignore
    .setProject(process.env.APPWRITE_PROJECT_ID);

export const appwriteAccount = new Account(appwriteClient);

// Register User
/*appwriteAccount.create(ID.unique(), "santosalarcon86@gmail.com", "Pepe12345", "Santos Alarcón Asensio")
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });*/
