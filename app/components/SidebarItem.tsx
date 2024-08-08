import SidebarItemStyles from "@/app/styles/SidebarItem.module.css";
import Image from "next/image";
import ActiveLink from "./ui/ActiveLink";

const SidebarItem = ({ icon, title, href, amount, expanded }: { icon: string, title: string, href: string, amount: number, expanded: boolean }) => {

	return (
		<li title={title} className={SidebarItemStyles.sidebar__item__container}>
			<ActiveLink href={href}>
				<div className={`${SidebarItemStyles.sidebar__item__group} ${!expanded && "collapsed"}`}>
					<div className={SidebarItemStyles.sidebar__item__left}>
						{/* @ts-ignore */}
						<Image alt={title} className={SidebarItemStyles.sidebar__item__icon} src={icon} width="24" height="24" priority />
                        {expanded ? <span className={SidebarItemStyles.sidebar__item__title}>{expanded ? title : null}</span> : null}
					</div>
					{(amount > 0 && expanded) && <span className={SidebarItemStyles.sidebar__item__amount}>{amount}</span>}
				</div>
			</ActiveLink>
		</li>
	);
};

export default SidebarItem;
