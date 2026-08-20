import { Sidebar } from "@primereact/ui/sidebar";
import Image from "next/image";
import { redirect } from "next/navigation";
import SidebarItemStyles from "@/app/styles/SidebarItem.module.css";
import { memo } from "react";
import CustomTooltip from "./ui/CustomTooltip";

const SidebarItem = memo(({
	icon,
	title,
	href,
	amount,
	expanded,
}: {
	icon: string;
	title: string;
	href: string;
	amount: number;
	expanded: boolean;
}) => {
	const menuButton = (
		<Sidebar.MenuButton pt-root-onClick={() => redirect(href)}>
			<Image
				alt={title}
				className={SidebarItemStyles.sidebar__item__icon}
				src={icon}
				width="20"
				height="20"
			/>
			<span>{title}</span>
			{amount > 0 && expanded && (
				<Sidebar.MenuBadge>{amount}</Sidebar.MenuBadge>
			)}
		</Sidebar.MenuButton>
	);

	return (
		<Sidebar.MenuItem key={title}>
			{!expanded ? (
				<CustomTooltip
					side="right"
					align="center"
					tooltipText={title}
					onClick={() => redirect(href)}
					severity="secondary"
				>
					{menuButton}
				</CustomTooltip>
			) : (
				menuButton
			)}
		</Sidebar.MenuItem>
	);
});

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
