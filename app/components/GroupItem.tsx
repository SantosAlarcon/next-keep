import GroupItemStyles from "@/app/styles/GroupItem.module.css";
import ActiveLink from "./ui/ActiveLink"

const GroupItem = ({ id, title, amount }: { id: string, title: string, amount: number }) => {
	return (
		<li className={GroupItemStyles.group__item__container}>
			<ActiveLink href={`/groups/${id}`}>
				<div className={GroupItemStyles.group__item__group}>
					<span className={GroupItemStyles.group__item__title}>{title}</span>
					{amount > 0 && <span className={GroupItemStyles.group__item__amount}>{amount}</span>}
				</div>
			</ActiveLink>
		</li>
	);
};

export default GroupItem;
