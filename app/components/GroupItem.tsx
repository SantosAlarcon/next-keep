import GroupItemStyles from "@/app/styles/GroupItem.module.css";
import Link from "next/link";

const GroupItem = ({ title, amount }: { title: string; amount: number }) => {
	return (
		<li className={GroupItemStyles.group__item__container}>
			<Link href={`/groups/${title}/`}>
				<div className={GroupItemStyles.group__item__group}>
					<span className={GroupItemStyles.group__item__title}>{title}</span>
					{amount > 0 && <span className={GroupItemStyles.group__item__amount}>{amount}</span>}
				</div>
			</Link>
		</li>
	);
};

export default GroupItem;
