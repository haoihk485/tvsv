import { useState, useCallback, useEffect } from 'react'
import { XMarkIcon, PencilIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'

import {
    updateDepartment,
    getDeparmentDetailById, getDeparments
} from '../../../utils/admin/departmentRequest'

import { refreshToken } from '../../../utils/request'



const DepDetailModal = ({ cb, id, dataChange }) => {
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (id === '') return
        getDeparmentDetailById(id)
            .then(fetchData => {
                console.log(fetchData);
                if (fetchData.success === true) {
                    setName(fetchData.data.name)
                    setDescription(fetchData.data.description)
                }
            })
    }, [id])

    const handleClose = useCallback(() => {
        setEditing(false)
        cb();
    }, [cb]);

    const handleUpdateDepartmnet = () => {
        dataChange(id, name, description)
    }

    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-500/30 z-20`}>
            <div className="flex justify-center h-full items-center">
                <div className="bg-white rounded-md p-1 flex-col justify-center items-center flex min-w-[350px]">
                    <div className="bg-gray-300 w-full flex justify-end">
                        <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white"
                            onClick={handleClose}></XMarkIcon>
                    </div>
                    <div className='w-full flex flex-col'>
                        <h1 className='text-center text-lg m-1 text-blue-500'>Phòng Ban</h1>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="depName">Id:</label>
                            <h1 className='text-gray-500 border-b border-black'>{id}</h1>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="name">Tên phòng ban</label>
                            <input type="text" className='border-b border-black outline-none pl-1 disabled:text-gray-500' disabled={!editing} value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="desc">Miêu tả:</label>
                            <input type="text" className='border-b border-black outline-none pl-1 disabled:text-gray-500' disabled={!editing} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                    </div>
                    <button className={`bg-[#2CC168] rounded-full p-2 m-1 text-white ${editing ? 'hidden' : ''} mt-5`}
                        onClick={() => { setEditing(!editing); console.log(id); }}>
                        <PencilIcon className='h-4 w-4 text-white inline-block'></PencilIcon>Chỉnh sửa</button>
                    <div className={`flex justify-around w-full ${editing ? '' : 'hidden'} mt-5`}>
                        <button className={`bg-[#2CC168] rounded-full p-2 m-1 text-white `}
                            onClick={handleUpdateDepartmnet}>
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

export default DepDetailModal