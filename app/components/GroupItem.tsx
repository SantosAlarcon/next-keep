import GroupItemStyles from "@/app/styles/GroupItem.module.css";
import ActiveLink from "./ui/ActiveLink";
import Image from "next/image";

const GroupItem = ({ id, title, amount, expanded }: { id: string; title: string; amount: number; expanded: boolean }) => {
	return (
		<li data-title={title} className={GroupItemStyles.group__item__container}>
			<ActiveLink href={`/groups/${id}`}>
				<div className={!expanded ? GroupItemStyles.group__item__group__collapsed : GroupItemStyles.group__item__group}>
					<div className={GroupItemStyles.group__item__left}>
						<Image className={GroupItemStyles.group__item__icon} src="/group.svg" width="20" height="20" alt="Group icon" />
						{expanded ? <span className={GroupItemStyles.group__item__title}>{title}</span> : null}
					</div>
					{amount > 0 && expanded && <span className={GroupItemStyles.group__item__amount}>{amount}</span>}
				</div>
			</ActiveLink>
		</li>
	);
};

export default GroupItem;
