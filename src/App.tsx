import React, {useState} from 'react';
import {Button, Drawer, Space} from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import printJS from 'print-js'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const url = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK"

function App() {

    const [link , setLink] = useState<string>(url)

    const [open, setOpen] = useState<boolean>(false);

    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
    }

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(
            pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
        );


    function handleChange(event: any) {
        setLink(event.target.value);
    }

    function handlePrint(event: any) {
        event.preventDefault()
        printJS(link)
    }

    return (
    <div className="App">
        <div>
                    <Space>
                    <input type={"text"} defaultValue={url} onChange={handleChange} />
                    <Button type="primary" onClick={showDrawer}>
                        Open
                    </Button>
                    </Space>
            <Drawer title="PDF Viewer" placement="right" width={'100%'} onClose={onClose} open={open}>
                <nav>
                   <Space>
                       <Button onClick={goToPrevPage}>Prev</Button>
                       <div>{pageNumber}</div>
                       <Button onClick={goToNextPage} >Next</Button>
                       <Button onClick={handlePrint} >print</Button>
                   </Space>
                </nav>
                <Document
                    file={link}
                    onLoadError={console.error}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            </Drawer>
        </div>
    </div>
  );
}

export default App;
