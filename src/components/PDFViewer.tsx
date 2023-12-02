// import React from 'react'

// type Props = {pdf_url: string}

// const PDFViewer = ({pdf_url}: Props) => {
//   return (
//     <iframe src={`https://docs.google.com/gview?url=${pdf_url}&emmbedded=true`} className="w-full h-full">

//     </iframe>
//   )
// }

// export default PDFViewer
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
import React from 'react';

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  return (
    <a href={pdf_url} target="_blank" rel="noopener noreferrer">
      View PDF
    </a>
  );
};

export default PDFViewer;

