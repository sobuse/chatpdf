 import React from 'react'

 type Props = {pdf_url: string}


  const PDFViewer = ({pdf_url }: Props) => {
    return (
        // <iframe src="https://docs.google.com/gview?url=http://infolab.stanford.edu/pub/papers/google.pdf&embedded=true" style="width:600px; height:500px;" frameborder="0"></iframe>

     <iframe src={`https://docs.google.com/gview?url=${encodeURI(pdf_url)}&embedded=true`} className="w-full h-full">

      </iframe>//&output=embed
   )
  }

  export default PDFViewer
// import React from 'react';
// import { Document, Page } from 'react-pdf';

// type Props = { pdf_url: string };

// const PDFViewer = ({ pdf_url }: Props) => {
//   return (
//     <div>
//       <Document file={pdf_url}>
//         <Page pageNumber={1} />
//       </Document>
//     </div>
//   );
// };

// export default PDFViewer;
 //import React from 'react';

//  type Props = { pdf_url: string };

//  const PDFViewer = ({ pdf_url }: Props) => {
//    return (
//      <a href={pdf_url} className="w-full h-full" target="_blank" rel="noopener noreferrer ">
//        View PDF
//      </a>
//    );
//  };

//  export default PDFViewer;

