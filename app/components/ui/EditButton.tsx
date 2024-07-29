"use client"

import EditIcon from "../icons/EditIcon"
import editIconStyles from "@/styles/EditButton.module.css"

function EditButton({label, noteId}: {label: string, noteId: string}) {
  return (
    <button type="button" className={editIconStyles.edit__button__container}>
        <EditIcon width="18px" height="18px" />
        <span className={editIconStyles.edit__button__label}>{label}</span>
    </button>
  )
}

export default EditButton
