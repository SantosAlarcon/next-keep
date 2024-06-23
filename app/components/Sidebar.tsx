import groups from "@/data/groups.json";
import styles from "../styles/sidebar.module.css"
import Image from "next/image";
import GroupItem from "./GroupItem";
import { getNotesByGroup } from "../utils/getNotesByGroup";

const Sidebar = () => {
    return (
        <aside className={styles.sidebar__container}>
            <Image src="/NextKeep.svg" alt="Next Keep logo" width="250" height="150" priority />
            <ul className={styles.sidebar__grouplist}>
                {
                    groups.map((group: string) => (
                        <GroupItem key={group} title={group} amount={getNotesByGroup(group).length} />
                    ))
                }
            </ul>
        </aside>
    );
};

export default Sidebar;
