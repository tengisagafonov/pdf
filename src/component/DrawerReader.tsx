import React, {useState} from 'react'
import {Button, Drawer, Space} from "antd";
import {Document, Page} from "react-pdf";
import printJS from "print-js";


interface IDrawerReader {
    link: string,
    open: boolean,
    onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

const DrawerReader = (props: IDrawerReader) => {
    const {link, onClose, open} = props;

    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }: any) {
        setNumPages(numPages);
    }

    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(
            pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
        );

    function handlePrint(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()
        printJS(link)
    }

    return (
    <Drawer title="PDF Viewer" placement="right" width={'100%'} onClose={onClose} open={open}>
        <nav>
        <Space>
            <Button onClick={goToPrevPage}>Prev</Button>
            <div>{pageNumber}</div>
            <Button onClick={goToNextPage} >Next</Button>
            <Button onClick={handlePrint} >print</Button>
        </Space>
        </nav>
        <Document file={link} onLoadError={console.error} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
        </Document>
    </Drawer>
    )
}

export default DrawerReader
