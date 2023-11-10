import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../assets/img/logo.png'
import { deleteAllCookies } from "../utils/cookie.jsx"
import { logout, refreshToken } from "../utils/request"

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const logoutHandle = async () => {
        if (isLoading) { return; }
        setIsLoading(true);

        try {
            const response = await logout()
            deleteAllCookies();
            navigate('/login')
        } catch (error) {
            console.log(error.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-300 p-4">
            <div className="flex items-center flex-no-shrink text-white w-1/2">
                <img src={logo} alt="" className='h-8 w-8 mr-2' />
                <span className="font-semibold text-lg tracking-tight text-[#2E3192] ">Tư Vấn Sinh Viên</span>
            </div>
            <div className="md:hidden flex w-1/2 justify-end">
                <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white" onClick={() => setIsOpen(!isOpen)}>
                    <Bars3Icon className='h-5 w-5'><title>Menu</title></Bars3Icon>
                </button>
            </div>

            <div className={`${isOpen ? "flex" : "hidden"} items-center w-full  md:w-auto md:bg-gray-300 md:flex p-4 md:p-0`}>
                <div className="text-md flex flex-col md:flex-row w-full justify-end ">
                    <hr className={`${isOpen ? "border-black border w-full md:hidden" : " "}`} />

                    <Link to="/register" className="mt-4 md:my-auto text-red-300 text-md hover:text-red-200 mr-4 font-bold">
                        Register
                    </Link>
                    <Link to="/login" className="mt-4 md:my-auto text-red-300 text-md hover:text-red-200 mr-4 font-bold">
                        Log In
                    </Link>
                    <button className="mt-4 md:my-auto text-red-300 text-md hover:text-red-200 mr-4 font-bold cursor-pointer" onClick={logoutHandle}>Log out</button>
                </div>
            </div>
        </nav>)
}

export default Navigation