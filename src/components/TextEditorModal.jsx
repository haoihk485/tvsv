import { useState, useCallback, useEffect } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { createQuestion, getAllDep, getDepField } from "../utils/user/request"
import { refreshToken } from "../utils/request"


const TextEditorModal = ({ cb }) => {

    //Quill setup
    const [value, setValue] = useState('')
    var toolbarOptions = [['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']]
    const module = {
        toolbar: toolbarOptions,
    }

    /////
    const [isLoading, setIsLoading] = useState(false)
    const [depData, setDepData] = useState([])
    const [fieldData, setFieldData] = useState([])
    const [depId, setDepId] = useState('')
    const [fieldId, setFieldId] = useState('')
    const [fieldTextBox, setFieldTextBox] = useState('Chọn lĩnh vực')
    const [depTextBox, setDepTextBox] = useState('Chọn phòng ban')

    const [showDepList, setShowDepList] = useState(false)
    const [showFieldList, setShowFieldList] = useState(false)
    const [title, setTitle] = useState('')

    useEffect(() => {
        getDepData()
    }, [])

    useEffect(() => {
        getFieldData()
    }, [depId])

    const getDepData = async () => {
        if (isLoading) return
        setIsLoading(true)

        try {
            await refreshToken()
            const response = await getAllDep()
            console.log(response);
            if (response.success) {
                setDepData(response.data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const getFieldData = async () => {
        if (depId === '') return
        if (isLoading) return
        setIsLoading(true)

        try {
            await refreshToken()
            const response = await getDepField(depId)
            console.log(response);
            if (response.success) {
                setFieldData(response.data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleDepChoose = (id, name) => {
        if (isLoading) return
        setDepTextBox(name)
        setDepId(id)
        setShowDepList(false)
        setFieldData([])
        setFieldTextBox('Chọn lĩnh vực')
    }

    const handleFieldChoose = (id, name) => {
        if (isLoading) return
        setFieldTextBox(name)
        setFieldId(id)
        setShowFieldList(false)
    }

    const handleCreateQuestion = async() => {
        console.log('work');

        if (depId === '') { alert('Vui lòng chọn phòng ban!!'); return }
        else if (fieldId === '') { alert('Vui lòng chọn lĩnh vực!!'); return }
        else if (title === '') { alert('Vui lòng nhập tiêu đề!!'); return }
        else if (value === '') { alert('Vui lòng nhập nội dung câu hỏi!!'); return }

        if (isLoading) return
        setIsLoading(true)
        try {
            await refreshToken()
            const response = await createQuestion(depId, fieldId, title, value)
            alert(response.message);
            if(response.success){
                setValue('')
                setTitle('')
            }
        } catch (error) {
            console.log(console.error);
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <div className={`fixed top-0 bottom-0 left-0 right-0 bg-gray-500/30`}>
            <div className="flex flex-col justify-center items-center h-full w-full shadow-lg">
                <div className="bg-white p-1 rounded-md overflow-hidden relative">
                    <div className="bg-gray-300 w-full flex justify-end overflow-hidden">
                        <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white " onClick={() => cb()}></XMarkIcon>
                    </div>
                    <h1 className="text-center text-xl bg-blue-100 text-gray-700 font-semibold rounded-t-md mt-2">
                        <p>Đặt câu hỏi</p>
                    </h1>
                    <div className="p-2 flex justify-between items-center border-x ">
                        <h1 className="ml-3 text-gray-600">Chọn phòng ban:</h1>
                        <div className="border-2 rounded-lg p-2 ml-2 w-[65%] flex justify-between relative">
                            <p className="text-gray-600">{depTextBox}</p>
                            <button
                                onClick={() => {
                                    setShowFieldList(false)
                                    setShowDepList(!showDepList)
                                }
                                }><ChevronDownIcon className="h-6 w-6 z-20 mr-3"></ChevronDownIcon>
                            </button>
                            {showDepList && (depData.length !== 0) &&
                                <div className="absolute w-full right-0 top-[42px] border bg-white shadow-lg overflow-y-scroll max-h-[130px] z-10">
                                    <h1 className="w-full hover:bg-gray-300 py-1 px-4">Chọn phòng ban</h1>
                                    {depData.map((dep, index) => {
                                        return <h1 key={index} className="w-full hover:bg-gray-300 py-1 px-4" onClick={() => {
                                            handleDepChoose(dep.id, dep.name)
                                        }}>{dep.name}
                                        </h1>
                                    })}
                                </div>}
                        </div>
                    </div>
                    <div className="p-2 flex justify-between items-center border-x ">
                        <h1 className="ml-3 text-gray-600">Chọn lĩnh vực:</h1>
                        <div className="border-2 rounded-lg p-2 ml-2 w-[65%] flex justify-between relative">
                            <p className="text-gray-600">{fieldTextBox}</p>
                            <button
                                onClick={() => {
                                    setShowDepList(false)
                                    setShowFieldList(!showFieldList)
                                    setShowDepList(false)
                                }
                                }><ChevronDownIcon className="h-6 w-6 z-20 mr-3"></ChevronDownIcon>
                            </button>
                            {
                                showFieldList &&
                                <div className="absolute w-full right-0 top-[42px] border bg-white shadow-lg overflow-y-scroll max-h-[130px] z-10">
                                    {(fieldData.length !== 0) &&
                                        <>
                                            <h1 className="w-full hover:bg-gray-300 py-1 px-4">Chọn lĩnh vực</h1>
                                            {fieldData.map((field, index) => {
                                                return <h1 key={index} className="w-full hover:bg-gray-300 py-1 px-4" onClick={() => { handleFieldChoose(field.id, field.name) }
                                                }>{field.name}</h1>
                                            })}
                                        </>
                                    }
                                    {(fieldData.length === 0) &&
                                        <h1 className="w-full hover:bg-gray-300 py-1 px-4">Phòng ban chưa có lĩnh vực nào!!</h1>
                                    }
                                </div>
                            }

                        </div>
                    </div>
                    <div className="p-2 flex justify-between items-center border-x">
                        <h1 className="ml-3 text-gray-600">Tiêu đề:</h1>
                        <input type="text" className="border-2 rounded-lg p-2 ml-2 w-[65%]" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="p-2 border-x border-b pb-4 rounded-md">
                        <h1 className="ml-3 text-gray-600">Nội dung:</h1>
                        <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} className=" text-black w-[600px] h-32 mb-9 mt-2" />
                    </div>
                    <button className="bg-blue-500 text-white p-1 m-1 min-w-[100px] rounded-lg float-right"
                        onClick={()=>handleCreateQuestion()}>Gửi</button>
                </div>
            </div>
        </div>
    )
}

export default TextEditorModal