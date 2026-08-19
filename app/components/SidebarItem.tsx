import { Sidebar } from "@primereact/ui/sidebar";
import Image from "next/image";
import { redirect } from "next/navigation";
import SidebarItemStyles from "@/app/styles/SidebarItem.module.css";
import { memo } from "react";

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
	return (
		<Sidebar.MenuItem key={title}>
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
		</Sidebar.MenuItem>
	);
});

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
