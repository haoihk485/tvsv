import { XMarkIcon } from '@heroicons/react/24/solid'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useCallback, useState } from 'react'
import { addDepartment } from '../../utils/request'
import { getCookie } from '../../utils/cookie'
import axios from 'axios'

import MyInput from '../MyInPut'

const AddDepModal = ({ show, cb }) => {
    const [depName, setDepName] = useState('')
    const [desc, setDesc] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const accessToken = getCookie('accessToken')

    const handleClose = useCallback(() => {
        cb();
    }, [cb]);

    const addDepHandle = async () => {
        if (isLoading) { return; }
        setIsLoading(true);
        try {
            if (depName !== '') {
                const response = await addDepartment(depName, desc, accessToken);
                console.log(response)
                if (response.data.success === true) {
                    alert(response.data.message);
                    setDepName('');
                    setDesc('');
                }
            }
        } catch (error) {
            console.error(error); // Xử lý lỗi
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-500/30 border ${show ? "" : "hidden"} z-20`}>
            <div className="flex justify-center h-full items-center ">
                <div className="bg-white rounded-md overflow-hidden p-1 flex-col justify-center items-center flex min-w-[350px]">
                    <div className="bg-gray-300 w-full flex justify-end">
                        <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white " onClick={handleClose}></XMarkIcon>
                    </div>
                    <div className='w-full flex flex-col'>
                        <h1 className='text-center text-lg m-1 text-blue-500'>Thêm Phòng ban</h1>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="depName">Tên phòng ban:</label>
                            <MyInput t={'text'} n={'depName'} p={'Tên Phòng Ban'} v={depName} oC={(e) => setDepName(e.target.value)}></MyInput>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="desc">Miêu tả:</label>
                            <MyInput t={'text'} n={'desc'} p={'Miêu tả'} v={desc} oC={(e) => setDesc(e.target.value)}></MyInput>
                        </div>
                    </div>
                    <button className='bg-[#2CC168] rounded-full p-2 m-1 text-white' onClick={addDepHandle}>
                        <PlusCircleIcon className='h-6 w-6 text-white inline-block'></PlusCircleIcon>Thêm</button>
                </div>
            </div>
        </div>
    )
}

export default AddDepModal