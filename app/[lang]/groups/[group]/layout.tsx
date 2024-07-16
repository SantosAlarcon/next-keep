import { getGroupById } from '@/app/utils/groups/getGroupById'
import React, { ReactNode } from 'react'
import groupPageStyles from '@/app/styles/groupPage.module.css'

export async function generateMetadata({params: {lang, group}}: {params: {lang: string, group: string}}) {
    const foundGroup = getGroupById(group)

    return {
	title: `${foundGroup[0].name}`
    }
}

const GroupLayout = ({children}: {children: ReactNode}) => {

  return (
	<div className={groupPageStyles.group__page__container}>{children}</div>
  )
}

export default GroupLayout
