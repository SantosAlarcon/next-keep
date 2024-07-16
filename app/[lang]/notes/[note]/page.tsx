import { getNoteById } from '@/app/utils/notes/getNoteById'
import notes from "@/data/notes.json"
import type { Metadata } from 'next'
import styles from "@/app/styles/NotePage.module.css"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export async function generateStaticParams() {
    return notes.map((note) => { note.id })
}

export async function generateMetadata({params: {note}}: {params: {note: string}}): Promise<Metadata> {
    const foundNote = getNoteById(note)

    return {
        title: `${foundNote?.title} - Next Keep`
    }
}

const NotePage = async ({ params: { note } }: { params: { note: string } }) => {
    const foundNote = getNoteById(note);

    return (
        <main className={styles.note__page__container}>
            <h1 className={styles.note__page__title}>{foundNote?.title}</h1>
            <Markdown className={styles.note__page__markdown} remarkPlugins={[remarkGfm]}>{foundNote?.data}</Markdown>
        </main>
    )
}

export default NotePage
