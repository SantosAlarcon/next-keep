import { getNoteById } from '@/app/utils/getNoteById'
import notes from "@/data/notes.json"
import { remark } from 'remark'
import remarkHtml from "remark-html"
import type { Metadata } from 'next'
import styles from "@/app/styles/NotePage.module.css"

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
    const processedContent = await remark().use(remarkHtml).process(foundNote?.data)
    const contentHtml = processedContent.toString()

    return (
        <main className={styles.note__page__container}>
            <h1>{foundNote?.title}</h1>
            <div dangerouslySetInnerHTML={{__html: contentHtml}}>
            </div>
        </main>
    )
}

export default NotePage
