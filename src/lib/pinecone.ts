import {PineconeClient, Vector} from "@pinecone-database/pinecone"
import { downloadFroms3 } from "./s3-server";
import {PDFLoader} from "langchain/document_loaders/fs/pdf"
import md5 from 'md5'
import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";

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
    //2. split and segment the pdf into smaller documents
    
    const documents = await Promise.all(pages.map(prepareDocument));

    //3. vectorise and embed individual documents
    const vectors = await Promise.all(documents.flat().map(embedDocument))
}

async function embedDocument(doc: Document){
    try {
        const embeddings = await getEmbeddings(doc.pageContent)
        const hash = md5(doc.pageContent)
        return {
            id:hash,
            values:embeddings,
            metadata:{
                text:doc.metadata.text,
                pageNumber: doc.metadata.pageNumber
            }
        } as Vector
    } catch (error) {
        console.log('error embedding document',error)
        throw error;
    }
}

export const truncateStringByBite = (str: string , bytes: number) => {
    const enc = new TextEncoder()
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0,bytes))
}

async function prepareDocument(page: PDFPage){
    let { pageContent,metadata} = page;
    pageContent = pageContent.replace(/\n/g,'')
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringByBite(pageContent,36000)
            }
        })
    ])
    return docs
}