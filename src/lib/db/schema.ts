
import {pgTable,serial,text} from "drizzle-orm/pg-core"


// export const chats = pgTable('chats', {
//     id: serial('id').primaryKey(),
//     pdfName: text('pdf_name').notNull(),
// })
const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    pdfName: text('pdf_name').notNull(),
    pdfUrl: text('pdf_url').notNull(),
})
