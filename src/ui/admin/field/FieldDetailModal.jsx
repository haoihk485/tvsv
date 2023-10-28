import { XMarkIcon, PencilIcon, ArrowLeftOnRectangleIcon, TrashIcon } from '@heroicons/react/24/solid'

import { useEffect, useState } from "react"
import { deleteField, getAllField, getFieldById, updateField } from '../../../utils/admin/fieldRequest'
import { refreshToken } from '../../../utils/request'

const FieldDetailModal = ({ show, cb, id, dataChange, page }) => {
    const [editing, setEditing] = useState(false)
    const [fieldName, setFieldName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (id === '') return
        getFieldById(id)
            .then(fetchData => {
                if (fetchData.success === true) {
                    setFieldName(fetchData.data.name)
                }
            })
    }, [id])

    const handleClose = () => {
        cb()
    }
    const handleUpdate = async () => {
        if (isLoading) return
        setIsLoading(true)
        await refreshToken()
        try {
            const response = await updateField(id, fieldName)
            if (response.success) {
                alert(response.message)
                const response2 = await getAllField(page)
                if (response2.success) {
                    dataChange(response2.data.items, response2.data.page, response2.data.pages)
                }
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
            setEditing(false)
        }
    }

    const handleDelete = async () => {
        if (isLoading) return
        if (!confirm('Bạn muốn xóa phòng ban này?')) return
        setIsLoading(true)
        await refreshToken()
        try {
            const response = await deleteField(id)
            if (response.success) {
                alert(response.message)
                const response2 = await getAllField(page)
                if (response2.success) {
                    dataChange(response2.data.items)
                }
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
            setEditing(false)
        }
    }

    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-500/30 ${show ? "" : "hidden"} z-20`}>
            <div className="flex justify-center h-full items-center">
                <div className="bg-white rounded-md p-1 flex-col justify-center items-center flex min-w-[350px]">
                    <div className="bg-gray-300 w-full flex justify-end">
                        <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white"
                            onClick={handleClose}></XMarkIcon>
                    </div>
                    <div className='w-full flex flex-col'>
                        <h1 className='text-center text-lg m-1 text-blue-500'>Lĩnh Vực</h1>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="depName">Id:</label>
                            <h1 className='text-gray-500 border-b border-black'>{id}</h1>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="name">Tên lĩnh vực</label>
                            <input type="text" className='border-b border-black outline-none pl-1 disabled:text-gray-500' disabled={!editing} value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
                        </div>

                    </div>
                    <div className={`flex justify-around w-full ${editing ? 'hidden' : ''} mt-5`}>

                        <button className={`bg-[#2CC168] rounded-full p-2 m-1 text-white`}
                            onClick={() => { setEditing(!editing); console.log(id); }}>
                            <PencilIcon className='h-4 w-4 text-white inline-block'></PencilIcon>Chỉnh sửa</button>
                        <button className={`bg-red-500 rounded-full p-2 m-1 text-white min-w-[100px]`}
                            onClick={ handleDelete  }>
                            <TrashIcon className='h-4 w-4 text-white inline-block '></TrashIcon>Xóa</button>
                    </div>
                    <div className={`flex justify-around w-full ${editing ? '' : 'hidden'} mt-5`}>
                        <button className={`bg-[#2CC168] rounded-full p-2 m-1 text-white `}
                            onClick={handleUpdate}>
                            <PencilIcon className='h-4 w-4 text-white inline-block'></PencilIcon>Xác nhận</button>
                        <button className={`bg-red-400 rounded-full p-2 m-1 text-white min-w-[100px]`}
                            onClick={() => setEditing(!editing)}>
                            <ArrowLeftOnRectangleIcon className='h-4 w-4 text-white inline-block'></ArrowLeftOnRectangleIcon>Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FieldDetailModal