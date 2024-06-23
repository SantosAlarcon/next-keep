import { getNoteById } from '@/app/utils/getNoteById'
import notes from "@/data/notes.json"
import { remark } from "remark"
import html from "remark-html"

export async function generateStaticParams() {
    return notes.map((note) => { note.id })
}

const NotePage = ({ params: { note } }: { params: { note: string } }) => {
    const foundNote = getNoteById(note);
    const processedMark = remark().use(html).process(foundNote?.content)
    const contentHtml = processedMark.toString()

    return (
        <main>
            <h1>{foundNote?.title}</h1>
            <div>
                {contentHtml}
            </div>
        </main>
    )
}

export default NotePage
