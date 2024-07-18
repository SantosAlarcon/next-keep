import groupPageStyles from "@/app/styles/groupPage.module.css";
import { getGroupById } from "@/app/utils/groups/getGroupById";
import type { ReactNode } from "react";

export function generateMetadata({ params: { group } }: { params: { group: string } }) {
    const foundGroup = getGroupById(group);

    return {
        title: `${foundGroup[0].name}`,
    };
}

const GroupLayout = ({ children }: { children: ReactNode }) => {

    return (
            <div className={groupPageStyles.group__page__container}>{children}</div>
    )
};

export default GroupLayout;
