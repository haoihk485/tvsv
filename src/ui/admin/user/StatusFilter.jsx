import {
    ChevronDownIcon,

} from '@heroicons/react/24/solid'
import { useState } from 'react'


const StatusFilter = () => {
    const [showFilter, SetShowFilter] = useState(false)
    return (
        <div className="ml-[1%] w-[19%] relative inline-block">
            <div className="rounded-full border border-gray-500 py-1 pl-5 flex justify-between" >
                <h1 className="inline-block">Tất cả</h1>
                <ChevronDownIcon className="w-4 h-4 inline-block mt-1 mr-5 cursor-pointer"
                onClick={()=>SetShowFilter(!showFilter)}></ChevronDownIcon>
            </div>
            {
                showFilter && 
                <div className={`rounded-xl border bg-gray-300 absolute w-full shadow-md overflow-hidden `}>
                    <ul className="w-full">
                        <li className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1">Tất cả</li>
                        <li className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1 border-y">Hoạt động</li>
                        <li className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1">Dừng hoạt động</li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default StatusFilter