import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:{    
        chatId: string
    };
};

const chatPage = async ({params:{chatId}}: Props) => {
    const {userId} = await auth()

    if(!userId){
        return redirect('/sign-in')
    }
    const _chats = await db.select().from(chats).where(eq(chats.userId, userId))
    if(!_chats){
        return redirect('/')
    }
    if(!_chats.find((chat)=> chat.id === parseInt(chatId))){
        return redirect("/")
    }

    return (  
        <div className='flex max-h-screen overflow-scroll'>
            <div className='flex max-h-screen overflow-scroll'>
                {/*chat side bar*/}
                <div className='flex-[1] max-w-xs'>
                {/*<ChartSideBar />*/}
                </div>
                {/*pdf viewer*/}
                <div className='max-h-screen p-4 overflow-scroll flex-[5]'>
                    {/*<PDFViewer*/}
                </div>
                {/*chat compnent*/}
                <div className='flex-[3] border-1-4 border-1-4 border-1-slate-200'>
                {/*<ChatComponent/>*/}

                </div>
            </div>
        </div>
        )
}


export default chatPage