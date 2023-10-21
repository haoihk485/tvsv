import { ChevronDownIcon, Bars3Icon } from '@heroicons/react/24/solid'
import downArrow from '../assets/svg/arrow_drop_down.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminNav = ({ avatarUrl }) => {
    const [isShow, setIsShow] = useState(false)
    const navigate = useNavigate()
    const showSideBar = () => {
        setIsShow(!isShow)
    }
    return (
        <div>
            <div className='bg-[#2CC168] p-2 flex items-center justify-between'>
                <Bars3Icon className='h-6 w-6 mx-1 cursor-pointer' onClick={showSideBar}></Bars3Icon>
                <div className=" flex items-center mx-1 bg-blue-200 px-2 py-[2px] rounded-full cursor-pointer">
                    <img src={avatarUrl} alt="" className='h-9 w-9 rounded-full' />
                    <img src={downArrow} alt="" className='' />
                </div>
            </div>
            <div className={`fixed top-[56px] left-0 right-0 bottom-0 ${isShow ? '' : 'hidden'} translate-x-[0%] duration-[2s]`}>
                <div className='flex w-full '>
                    <div className='w-[30%] bg-blue-gray-50 min-h-screen opacity-100 border-r border-gray-300 flex flex-col items-center'>
                        <div className='text-[#898989] font-bold text-3xl my-5 cursor-pointer' onClick={()=>{navigate('/admin')}}>ADMIN</div>
                        <div className='border-t-2 border-gray-300 flex flex-col items-center w-full'>
                            <button className='bg-[#2CC068] hover:bg-[#A4FFC9] hover:text-black text-white font-semibold px-4 py-1 rounded-xl my-2 min-w-[75%] mt-5'
                                onClick={() => { navigate('/admin/department') }}>Quản lý phòng ban</button>
                            <button className='bg-[#2CC068] hover:bg-[#A4FFC9] hover:text-black text-white font-semibold px-4 py-1 rounded-xl my-2 min-w-[75%]'
                                onClick={() => { navigate('/admin/user') }}>Quản lý người dùng</button>
                            <button className='bg-[#2CC068] hover:bg-[#A4FFC9] hover:text-black text-white font-semibold px-4 py-1 rounded-xl my-2 min-w-[75%]'
                                onClick={() => { navigate('/admin/field') }}>Quản lý phòng ban</button>
                            <button className='bg-[#2CC068] hover:bg-[#A4FFC9] hover:text-black text-white font-semibold px-4 py-1 rounded-xl my-2 min-w-[75%]'
                                onClick={() => { navigate('/admin/field') }}>Quản lý phòng ban</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminNav