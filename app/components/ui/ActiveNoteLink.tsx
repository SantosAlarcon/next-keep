"use client"

import Link from 'next/link'
import React from 'react'
import noteStyles from "@/app/styles/NoteList.module.css"

const ActiveNoteLink = ({href, selected, children}: {href: string, selected: boolean, children: React.ReactNode}) => {

  return (
	  <Link href={href} className={`${selected ? noteStyles.note__item__selected : ""}`}>
            {children}
        </Link>
  
  )
}

export default ActiveNoteLink
