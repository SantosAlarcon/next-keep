"use client";
import {SignOut} from "@primeicons/react/sign-out"
import { Button } from "@primereact/ui/button";
import { useT } from "next-i18next/client";
import { toast } from "sonner";
import UserStyles from "@/app/styles/User.module.css";
import { logout } from "@/app/utils/logout";
import CustomTooltip from "./CustomTooltip";

const User = () => {
	const { t } = useT("common");

	const handleLogout = () => {
        toast.loading(t("logging-out"));
		window.localStorage.removeItem("sidebar_expanded");
		logout().then(() => {
			window.location.assign(`/login`);
		});
	};

	return (
		<CustomTooltip side={"top"} align={"center"} tooltipText={t("logout")}>
			<Button
				aria-label={t("logout")}
				className={UserStyles.user__container}
				onClick={handleLogout}
			>
                <SignOut />
            </Button>
		</CustomTooltip>
	);
};

export default User;
