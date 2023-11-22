import {pgTable,serial,text, varchar,timestamp, integer,pgEnum} from "drizzle-orm/pg-core"

export const userSystemEnum = pgEnum('user_system_enum',['system','user'])

const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    pdfName: text('pdf_name').notNull(),
    pdfUrl: text('pdf_url').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    userId: varchar('user_id',{length:256}).notNull(),
    fileKey: text('file_key').notNull(),

})

export const messages = pgTable("message", {
    id: serial("id").primaryKey(),
    chatId: integer('chat_id').references(()=>chats.id).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    role: userSystemEnum('role').notNull()
});
