import {Client, Account, ID} from "appwrite" 

const AppwriteClient = new Client();

AppwriteClient
    .setLocale("es")
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66a36b260022203773a5');

const account = new Account(AppwriteClient);

// Register User
account.create(ID.unique(), "santosalarcon86@gmail.com", "Pepe12345", "Santos Alarcón Asensio")
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

export default AppwriteClient;
