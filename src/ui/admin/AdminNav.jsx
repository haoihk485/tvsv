import { ChevronDownIcon, Bars3Icon } from '@heroicons/react/24/solid'
import downArrow from '../../assets/svg/arrow_drop_down.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie, deleteAllCookies } from '../../utils/cookie'
import { logout } from '../../utils/request'

const AdminNav = ({ avatarUrl }) => {
    const [isShow, setIsShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [showUserMenu, SetShowUserMenu] = useState(false)
    const showSideBar = () => {
        setIsShow(!isShow)
    }
    const logoutHandle = async () => {
        if (isLoading) { return; }
        setIsLoading(true);

        try {
            const response = await logout()
            if (response.success) {
                deleteAllCookies();
                navigate('/login')
            }
        } catch (error) {
            console.log(error.message)
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='z-10 relative'>
            <div className='bg-[#2CC168] p-2 flex items-center justify-between'>
                <Bars3Icon className='h-6 w-6 mx-1 cursor-pointer' onClick={showSideBar}></Bars3Icon>
                <div>
                    <div className=" flex items-center mx-1 bg-blue-200 px-2 py-[2px] rounded-full cursor-pointer" onClick={()=>SetShowUserMenu(!showUserMenu)}>
                        <img src={avatarUrl} alt="" className='h-7 w-7 m-1 rounded-full' />
                        <img src={downArrow} alt="" className='' />
                    </div>
                    <div className={`absolute bg-gray-300 w-[180px] right-3 rounded-lg border overflow-hidden shadow-md ${showUserMenu?'':'hidden'}`}>
                        <ul className='px-3 py-1'>
                            <li className='cursor-pointer hover:text-gray-600 my-1'>Chỉnh sửa thông tin</li>
                            <li className='cursor-pointer hover:text-gray-600 my-1 border-t-2 ' onClick={logoutHandle}>Đăng xuất</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`fixed top-[56px] left-0 right-0 bottom-0 ${isShow ? '' : 'hidden'} translate-x-[0%] duration-[2s]`}>
                <div className='flex w-full '>
                    <div className='w-[30%] bg-blue-gray-50 min-h-screen opacity-100 border-r border-gray-300 flex flex-col items-center'>
                        <div className='text-[#898989] font-bold text-3xl my-5 cursor-pointer' onClick={() => { navigate('/admin') }}>ADMIN</div>
                        <div className='border-t-2 border-gray-300 flex flex-col items-center w-full'>
                            <button className='bg-[#2CC068] hover:bg-[#A4FFC9] hover:text-black text-white font-semibold px-4 py-1 rounded-xl my-2 min-w-[75%] mt-5'
                                onClick={() => { navigate('/admin/departments') }}>Quản lý phòng ban</button>
                            <button className='bg-[#2CC068] hover:bg-[#A4FFC9] hover:text-black text-white font-semibold px-4 py-1 rounded-xl my-2 min-w-[75%]'
                                onClick={() => { navigate('/admin/fields') }}>Quản lý lĩnh vực</button>
                            <button className='bg-[#2CC068] hover:bg-[#A4FFC9] hover:text-black text-white font-semibold px-4 py-1 rounded-xl my-2 min-w-[75%]'
                                onClick={() => { navigate('/admin/users') }}>Quản lý người dùng</button>
                            <button className='bg-[#2CC068] hover:bg-[#A4FFC9] hover:text-black text-white font-semibold px-4 py-1 rounded-xl my-2 min-w-[75%]'
                                onClick={() => { console.log(getCookie('role')) }}>Role</button>
                            <button className='bg-[#2CC068] hover:bg-[#A4FFC9] hover:text-black text-white font-semibold px-4 py-1 rounded-xl my-2 min-w-[75%]'
                                onClick={() => { logoutHandle }}>Đăng xuất</button>
                        </div>
                    </div>
                    <div className='w-[70%]' onClick={()=>{setIsShow(!isShow)}}></div>
                </div>
            </div>
        </div>

    )
}

export default AdminNav