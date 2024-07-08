import GroupItemStyles from "@/app/styles/GroupItem.module.css";
import { headers } from "next/headers";
import ActiveLink from "./ui/ActiveLink"

const GroupItem = ({ id, title, amount }: { id: string, title: string; amount: number }) => {
	const headerList = headers()
	const currentPath = headerList.get("x-current-path")
	const selected = currentPath?.includes(`/groups/${id}`)

	return (
		//<li className={`${GroupItemStyles.group__item__container} ${selected && GroupItemStyles.group__item__selected}`}>
		<li className={GroupItemStyles.group__item__container}>
			<ActiveLink href={`/groups/${id}/`}>
				<div className={GroupItemStyles.group__item__group}>
					<span className={GroupItemStyles.group__item__title}>{title}</span>
					{amount > 0 && <span className={GroupItemStyles.group__item__amount}>{amount}</span>}
				</div>
			</ActiveLink>
		</li>
	);
};

export default GroupItem;
