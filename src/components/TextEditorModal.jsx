import { useState, useCallback } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { XMarkIcon } from '@heroicons/react/24/solid'

const TextEditorModal = ({ show, cb }) => {
    const [value, setValue] = useState('')
    const handleClose = useCallback(() => {
        cb();
    }, [cb]);
    var toolbarOptions = [['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']]
    const module = {
        toolbar: toolbarOptions,
    }
    return (
        <div className={`fixed top-0 bottom-0 left-0 right-0 bg-gray-500/30 ${show ? "" : "hidden"}`}>
            <div className="flex justify-center items-center h-full w-full">
                <div className="bg-white p-1 rounded-md overflow-hidden">
                    <div className="bg-gray-300 w-full flex justify-end">
                        <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white " onClick={handleClose}></XMarkIcon>
                    </div>
                    <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} className="border-2 text-black w-[600px]" />
                    <button className="bg-blue-500 text-white p-1 m-1 min-w-[100px] rounded-lg float-right">Gửi</button>
                </div>
            </div>
        </div>
    )
}

export default TextEditorModal