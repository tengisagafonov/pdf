import React, {useState} from 'react';
import {Button, Space} from 'antd';
import { pdfjs } from 'react-pdf';
import DrawerReader from "./component/DrawerReader";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const url = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK"

function App() {

    const [link , setLink] = useState<string>(url)
    const [open, setOpen] = useState<boolean>(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


   const  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLink(event.target.value);
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
           <DrawerReader link={link} open={open} onClose={onClose} />
        </div>
    </div>
  );
}

export default App;
