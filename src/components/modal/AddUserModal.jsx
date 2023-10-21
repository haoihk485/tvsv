import { XMarkIcon } from '@heroicons/react/24/solid'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useCallback } from 'react'

import MyInput from '../MyInPut'


const AddUserModal = ({ show, cb }) => {
    const handleClose = useCallback(() => {
        cb();
    }, [cb]);

    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-500/30 border ${show ? "" : "hidden"}`}>
            <div className="flex justify-center h-full items-center ">
                <div className="bg-white rounded-md overflow-hidden p-1 flex-col justify-center items-center flex">
                    <div className="bg-gray-300 w-full flex justify-end">
                        <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white " onClick={handleClose}></XMarkIcon>
                    </div>
                    <div className='w-full flex flex-col'>
                        <h1 className='text-center text-lg m-1 text-blue-500'>Thêm Người Dùng</h1>
                        <MyInput t={'text'} n={'Tên người dùng'} p={'Tên người dùng'}></MyInput>
                        <MyInput t={'text'} n={'Tên người dùng'} p={'Tên người dùng'}></MyInput>
                        <MyInput t={'text'} n={'Tên người dùng'} p={'Tên người dùng'}></MyInput>
                        <MyInput t={'text'} n={'Tên người dùng'} p={'Tên người dùng'}></MyInput>

                    </div>
                    <button className='bg-[#2CC168] rounded-full p-2 m-1 text-white'>
                        <PlusCircleIcon className='h-6 w-6 text-white inline-block'></PlusCircleIcon>Thêm</button>
                </div>
            </div>
        </div>
    )
}

export default AddUserModal