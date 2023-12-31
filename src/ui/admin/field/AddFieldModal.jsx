import {PlusCircleIcon, XMarkIcon} from '@heroicons/react/24/solid'

import MyInput from '../../../components/MyInPut'
import { addField, getAllField } from '../../../utils/admin/fieldRequest'

import { useState } from 'react'
import { refreshToken } from '../../../utils/request'
const AddFieldModal = ({show, cb, dataChange, page}) => {
    const [fieldName, setFieldName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = () => {
        cb()
    }

    const addFieldHandle = async () => {
        try {
            if (isLoading) return
            setIsLoading(true)

            await refreshToken()
            const response = await addField(fieldName)
            if(response.success) {
                alert(response.message)
                setFieldName('')
                const response2 = await getAllField(page)
                if(response2.success){
                    dataChange(response2.data.items, response2.data.page, response2.data.pages)
                }
            }
        } catch (error) {
            console.log(error.message)
        } finally{
            setIsLoading(false)
        }

    }
    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-500/30 ${show ? "" : "hidden"} z-20`}>
            <div className="flex justify-center h-full items-center ">
                <div className="bg-white rounded-md overflow-hidden p-1 flex-col justify-center items-center flex min-w-[350px]">
                    <div className="bg-gray-300 w-full flex justify-end">
                        <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white " onClick={handleClose}></XMarkIcon>
                    </div>
                    <div className='w-full flex flex-col mb-5'>
                        <h1 className='text-center text-lg m-1 text-blue-500'>Thêm Lĩnh Vực</h1>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="depName">Tên lĩnh vực:</label>
                            <MyInput t={'text'} n={'depName'} p={'Tên Phòng Ban'} v={fieldName} oC={(e)=>{setFieldName(e.target.value)}}></MyInput>
                        </div>
                    </div>
                    <button className='bg-[#2CC168] rounded-full p-2 m-1 text-white' onClick={addFieldHandle}>
                        <PlusCircleIcon className='h-6 w-6 text-white inline-block'></PlusCircleIcon>Thêm</button>
                </div>
            </div>
        </div>
    )
}

export default AddFieldModal