import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { LogInIcon } from "lucide-react";


export default async function Home() {
  const {userId} = await auth();
  const isAuth = !!userId
  return (<div className="w-screen min-h-screen bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center">
          <h1 className="mr-3 text -5xl font-semibold">Chat with any PDF</h1>
          <UserButton afterSignOutUrl="/"/>
        </div>
        <div className="flex mt-2">
          {isAuth && <Button>Go to Chat</Button>}
        </div>
        <p className="max-w-xl mt-1 text-lg text-slate-600">
          Join millions of students, 
          researchers and proffesionals
           to instantly answer questions
            and understandresearch with AI
        </p>
        <div className="w-full mt-4">
          {isAuth ? (<h1>FileUpload</h1>): (
             <Link href="/sign-in">
                <Button>login to get started 
                  <LogInIcon className="w-4 h-4 ml-2"/>
                </Button>
             </Link>
          )}
        </div>

      </div>
      </div>
  </div>)
}
