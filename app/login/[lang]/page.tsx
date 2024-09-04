"use client"

import initTranslations from "@/app/i18n";
import Image from "next/image";
import LoginStyles from "@/styles/Login.module.css";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Ripple } from "primereact/ripple";
import { emailLogin } from "@/app/utils/login";
import { Toaster } from "sonner";
import i18nClient from "@/app/i18n-client";
import { useEffect, useState } from "react";

const LoginPage = ({ params: { lang } }: { params: { lang: string } }) => {
    const t = i18nClient.getFixedT(lang, "login");
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return (
        <main>
            <Toaster richColors position="top-center" />
            <section className={LoginStyles.login__page__container}>
                <div className={LoginStyles.login__page__left}>
                    <Image src="/NextKeep.svg" alt="Next Keep Logo" width={150} height={150} />
                    <h1>{t("title")}</h1>
                    <Button label={t("login-google")} icon="pi pi-google" className="p-button-rounded" />
                    <Button label={t("login-github")} icon="pi pi-github" className="p-button-rounded" />
                    <Button disabled label={t("login-facebook")} icon="pi pi-facebook" className="p-button-rounded" />
                    <hr />
                    <form id="emailLoginForm" action={emailLogin} className={LoginStyles.login__page__form}>
                        <FloatLabel>
                            <InputText type="email" className={LoginStyles.login__page__form__input} id="email" name="email" required />
                            <label className={LoginStyles.login__page__form__label} htmlFor="email">{t("email")}</label>
                        </FloatLabel>
                        <FloatLabel>
                            <Password
                                className={LoginStyles.login__page__form__input}
                                id="password"
                                name="password"
                                required
                                feedback={false}
                                toggleMask
                            />
                            <label className={LoginStyles.login__page__form__label} htmlFor="password">{t("password")}</label>
                        </FloatLabel>
                        <Button type="submit" label={t("login")} className="p-button-rounded" />
                    </form>
                    <Ripple />
                </div>
                <div className={LoginStyles.login__page__right}>Aquí falta añadir una imágen</div>
            </section>
        </main>
    );
};

export default LoginPage;
