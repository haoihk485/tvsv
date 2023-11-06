import { XMarkIcon } from '@heroicons/react/24/solid'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useCallback, useState } from 'react'

import MyInput from '../../../components/MyInPut'
import SelectBox from '../../../components/SelectBox'
import { addUser } from '../../../utils/admin/userRequest'
import { refreshToken } from '../../../utils/request'


const AddUserModal = ({ cb, dataChange }) => {
    const roleData = [
        { name: 'Tư vấn viên' },
        { name: 'Trưởng phòng ban' },
        { name: 'Giám sát' }
    ]
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [selectBoxText, setSelectBoxText] = useState('Chọn vị trí')
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = useCallback(() => {
        cb();
    }, [cb]);

    const handleAddUser = async () => {
        if (isLoading) return
        setIsLoading(true)
        try {
            console.log(role);
            await refreshToken()
            const response = await addUser(name, email, phone, password, role)
            if (response.data) {
                dataChange(0)
            } else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error.message);
        }
        finally {
            setIsLoading(false)
        }
    }

    const handleEleSelectBoxClick = (r) => {
        const temp = r === 'Tư vấn viên' ? 'counsellor' : r === 'Trưởng phòng ban' ? 'departmentHead' : 'supervisor'
        setSelectBoxText(r)
        setRole(temp)
    }

    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-500/30 border z-10`}>
            <div className="flex justify-center h-full items-center ">
                <div className="bg-white rounded-md p-1 flex-col justify-center items-center flex w-[500px]">
                    <div className="bg-gray-300 w-full flex justify-end overflow-hidden">
                        <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white " onClick={handleClose}></XMarkIcon>
                    </div>
                    <div className='w-full flex flex-col px-2'>
                        <h1 className='text-center text-lg m-1 text-blue-500'>Thêm Nhân sự</h1>
                        <div className='flex justify-between items-center'>
                            <label htmlFor="depName" className='min-w-[150px]'>Tên nhân viên:</label>
                            <MyInput t={'text'} n={'username'} v={name} oC={(e) => setName(e.target.value)}></MyInput>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="depName" className='min-w-[150px]'>Vị trí</label>
                            <SelectBox data={roleData} eleClick={handleEleSelectBoxClick}>{selectBoxText}</SelectBox>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="depName" className='min-w-[150px]'>Email:</label>
                            <MyInput t={'email'} n={'email'} v={email} oC={(e) => setEmail(e.target.value)}></MyInput>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="depName" className='min-w-[150px]'>Số điện thoại:</label>
                            <MyInput t={'tel'} n={'phone'} v={phone} oC={(e) => setPhone(e.target.value)}></MyInput>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <label htmlFor="depName" className='min-w-[150px]'>Mật khẩu:</label>
                            <MyInput t={'password'} n={'password'} v={password} oC={(e) => setPassword(e.target.value)}></MyInput>
                        </div>


                    </div>
                    <button className='bg-[#2CC168] rounded-full p-2 m-1 text-white' onClick={handleAddUser}>
                        <PlusCircleIcon className='h-6 w-6 text-white inline-block'></PlusCircleIcon>Thêm</button>
                </div>
            </div>
        </div>
    )
}

export default AddUserModal