import SidebarItemStyles from "@/app/styles/SidebarItem.module.css";
import Image from "next/image";
import ActiveLink from "./ui/ActiveLink";

const SidebarItem = ({ icon, title, href, amount }: { icon: string, title: string; href: string; amount: number }) => {

	return (
		<li className={SidebarItemStyles.sidebar__item__container}>
			<ActiveLink href={href}>
				<div className={SidebarItemStyles.sidebar__item__group}>
					<div className={SidebarItemStyles.sidebar__item__left}>
						<Image className={SidebarItemStyles.sidebar__item__icon} src={icon} width="24" height="24" priority />
						<span className={SidebarItemStyles.sidebar__item__title}>{title}</span>
					</div>
					{amount > 0 && <span className={SidebarItemStyles.sidebar__item__amount}>{amount}</span>}
				</div>
			</ActiveLink>
		</li>
	);
};

export default SidebarItem;
