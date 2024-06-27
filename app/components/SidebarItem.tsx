import SidebarItemStyles from "@/app/styles/SidebarItem.module.css";
import Link from "next/link";

const SidebarItem = ({ title, href, amount }: { title: string; href: string; amount: number }) => {
	return (
		<li className={SidebarItemStyles.sidebar__item__container}>
			<Link href={href}>
				<div className={SidebarItemStyles.sidebar__item__group}>
					<span className={SidebarItemStyles.sidebar__item__title}>{title}</span>
					{amount > 0 && <span className={SidebarItemStyles.sidebar__item__amount}>{amount}</span>}
				</div>
			</Link>
		</li>
	);
};

export default SidebarItem;
