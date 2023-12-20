// import { OpenAIApi, Configuration } from "openai-edge";

// const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// })

// const openai = new OpenAIApi(config);


// export async function getEmbeddings(text: string) {
//     try {
//       const response = await openai.createEmbedding({
//         model: 'text-embedding-ada-002',
//         input: text.replace(/\n/g, ''),
//       });
      
      
//       const result = await response.json();
      
//       if (result.data && result.data.length > 0 && result.data[0].embedding) {
//         return result.data[0].embedding as number[];
//       } else {
//         throw new Error('Embedding data is missing or undefined.');
//       }
//     } catch (error) {
//       console.log('error calling openai embeddings api', error);
//       throw error;
//     }
//   }

  
  

// export async function getEmbeddings(text:string){
//     try {
//         const response = await openai.createEmbedding({
//             model: 'text-embedding-ada-002',
//             input: text.replace(/\n/g,'')
//         })
//         const result = await response.json()
//         return result.data[0].embedding as number[]
//     } catch (error) {
//         console.log('error calling openai embeddings api',error)
//         throw error;
//     }
// }

//new code 
import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: text.replace(/\n/g, ''),
    });

    if (!response.ok) {
        console.log(response)
      throw new Error(`OpenAI API request failed with status: ${response.status}`);

    }

    const result = await response.json();

    if (result.data && result.data.length > 0 && result.data[0].embedding) {
      return result.data[0].embedding as number[];
    } else {
      throw new Error('Embedding data is missing or undefined.');
    }
  } catch (error) {
    console.error('Error calling OpenAI embeddings API', error);
    throw error;
  }
}
