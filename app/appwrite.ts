import { Client, Account } from "appwrite"

export const appwriteClient = new Client();

appwriteClient
    .setLocale("es")
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66a36b260022203773a5');

export const appwriteAccount = new Account(appwriteClient);

// Register User
/*appwriteAccount.create(ID.unique(), "santosalarcon86@gmail.com", "Pepe12345", "Santos Alarcón Asensio")
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });*/
