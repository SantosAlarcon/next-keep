import React from 'react'
import styles from "@/app/styles/GroupItem.module.css"

const GroupItem = ({title, amount}: {title: string, amount: number}) => {
    console.log(title)
    return (
        <li className={styles.group__item__container}>
            <span className={styles.group__item__title}>{title}</span>
            {amount > 0 && (<span className={styles.group__item__amount}>{amount}</span>)}
        </li>
    )
}

export default GroupItem
