import GroupItemStyles from "@/app/styles/GroupItem.module.css";
import { headers } from "next/headers";
import Link from "next/link";

const GroupItem = ({ id, title, amount }: { id: string, title: string; amount: number }) => {
	const headerList = headers()
	const currentPath = headerList.get("x-current-path")
	const selected = currentPath?.includes(`/groups/${id}`)
	console.table([currentPath, selected])

	return (
		<li className={`${GroupItemStyles.group__item__container} ${selected && GroupItemStyles.group__item__selected}`}>
			<Link href={`/groups/${id}/`}>
				<div className={GroupItemStyles.group__item__group}>
					<span className={GroupItemStyles.group__item__title}>{title}</span>
					{amount > 0 && <span className={GroupItemStyles.group__item__amount}>{amount}</span>}
				</div>
			</Link>
		</li>
	);
};

export default GroupItem;
