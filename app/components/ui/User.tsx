"use client";
import { SignOut } from "@primeicons/react/sign-out";
import { SidebarMenuButton } from "@primereact/ui/sidebar";
import { useT } from "next-i18next/client";
import { toast } from "sonner";
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
		<CustomTooltip
			side={"top"}
			align={"center"}
			tooltipText={t("logout")}
			onClick={handleLogout}
			severity="secondary"
			as={SidebarMenuButton}
			style={{
				justifyContent: "center",
			}}
		>
			<SignOut size={"20"} />
		</CustomTooltip>
	);
};

export default User;
