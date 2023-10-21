import { ExclamationCircleIcon,CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const AlertMessage = ({ type, message }) => {

    return (
        <div className={`right-8 flex items-center bg-white rounded-md border-l-4 ${(type==="error")?"border-red-500":""} shadow-lg py-5 mt-6 w-[450px]`}>
            <div className='px-4 '>
                <ExclamationCircleIcon className={`w-6 h-6 ${(type === "error") ? "text-red-500" : "hidden"}`} ></ExclamationCircleIcon>
                <CheckCircleIcon className={`w-6 h-6 ${(type === "success") ? "text-green-400" : "hidden"}`} ></CheckCircleIcon>
            </div>
            <div className='flex-grow'>
                <h3 className='text-base font-semibold text-[#333]'>{(type === "error"?"Fail":"Success")}</h3>
                <p className='text-[14px] text=[#888]'>{message}</p>
            </div>
            <div className='px-4'>
                <XMarkIcon className='w-6 h-6 opacity-30 cursor-pointer font-bold'></XMarkIcon>
            </div>
        </div>
    )
}

export default AlertMessage