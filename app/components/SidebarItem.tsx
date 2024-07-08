import SidebarItemStyles from "@/app/styles/SidebarItem.module.css";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const SidebarItem = ({ icon, title, href, amount }: { icon: string, title: string; href: string; amount: number }) => {
	const headerList = headers()
	const currentPath = headerList.get("x-current-path")
	const selected = currentPath?.includes(href)

	return (
		<li className={`${SidebarItemStyles.sidebar__item__container} ${selected && SidebarItemStyles.sidebar__item__selected}`}>
			<Link href={href} passHref>
				<div className={SidebarItemStyles.sidebar__item__group}>
					<div className={SidebarItemStyles.sidebar__item__left}>
						<Image className={SidebarItemStyles.sidebar__item__icon} src={icon} width="24" height="24" priority />
						<span className={SidebarItemStyles.sidebar__item__title}>{title}</span>
					</div>
					{amount > 0 && <span className={SidebarItemStyles.sidebar__item__amount}>{amount}</span>}
				</div>
			</Link>
		</li>
	);
};

export default SidebarItem;
