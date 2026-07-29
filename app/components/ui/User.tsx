"use client";
import { Button } from "@primereact/ui/button";
import { useTranslation } from "react-i18next";
import { localeStore } from "@/app/store/localeStore";
import UserStyles from "@/app/styles/User.module.css";
import { logout } from "@/app/utils/logout";
import CustomTooltip from "./CustomTooltip";

const User = () => {
	// @ts-ignore
	const { locale } = localeStore.getState();
	const { t } = useTranslation("common", { lng: locale });

	const handleLogout = () => {
		window.localStorage.removeItem("sidebar_expanded");
		// @ts-ignore
		logout().then(() => {
			window.location.assign(`/login/${locale}`);
		});
	};

	return (
		<CustomTooltip side={"top"} align={"center"} tooltipText={t("logout")}>
			<Button
				aria-label={t("logout")}
				icon="pi pi-sign-out"
				className={UserStyles.user__container}
				onClick={handleLogout}
			/>
		</CustomTooltip>
	);
};

export default User;
