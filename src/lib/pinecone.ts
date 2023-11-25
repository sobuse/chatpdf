import {PineconeClient} from "@pinecone-database/pinecone"
import { downloadFroms3 } from "./s3-server";
import {PDFLoader} from "langchain/document_loaders/fs/pdf"

let pinecone: PineconeClient | null = null;

export const getPineconeClient = async () =>{
    if(!pinecone){
        pinecone = new PineconeClient()
        await pinecone.init({
            environment: process.env.PINECONE_ENVIRONMENT!,
            apiKey:process.env.PINECONE_API_KEY!
        })

    }
    return pinecone;
}

type PDFPage ={  
    pageContent: string;
    metadata:{   
        loc:{pageNumber:number}
    }
}

export async function loadS3intoPinecone(fileKey:string){
    //1. obtain the pdf -> download and read from pdf
    console.log('dowloading s3 into file system');
    const file_name = await downloadFroms3(fileKey);
    if(!file_name){
        throw new Error("Could not download from s3");

    }
    const loader = new PDFLoader(file_name);
    const pages = (await loader.load()) as PDFPage[];
    //2. split and segment the pdf imto smaller documents
    return pages;
}
