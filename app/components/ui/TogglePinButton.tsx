"use client"

import FixedIcon from '../icons/FixedIcon'
import UnfixedIcon from '../icons/UnfixedIcon'
import type { Note } from '@/app/types'
import pinnedButtonStyles from "@/app/styles/PinnedButton.module.css"
import { toggleNotePin } from '@/app/utils/notes/toggleNotePin'
import { useRouter } from 'next/navigation'

const TogglePinButton = ({title, note}: {title: string, note: Note}) => {
    const router = useRouter()
    const handleClick = () => {
        toggleNotePin(note)
        router.refresh()
    }

  return (
    <button onClick={handleClick} title={title} type="button" className={pinnedButtonStyles.pinned__button__container}>
            {note.isPinned ? <FixedIcon width="24px" height="24px" /> : <UnfixedIcon width="24px" height="24px" />}
    </button>
  )
}

export default TogglePinButton
