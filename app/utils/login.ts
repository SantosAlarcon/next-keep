"use server"

import { toast } from "sonner"
import { appwriteAccount } from "../appwrite"

export async function emailLogin(data: FormData) {
    const email = data.get("email")
    const password = data.get("password")

    if (email && password) {
        // @ts-ignore
        appwriteAccount.createEmailPasswordSession(email, password)
            .then((response) => {
                toast.success("Ha habido éxito a la hora de iniciar sesión")
            })
            .catch((error) => console.error(error))
    }

}
