import {
    ChevronDownIcon,

} from '@heroicons/react/24/solid'
import { useState } from 'react'


const Filter = ({ type, filterData, onEleClick }) => {
    const [showFilter, SetShowFilter] = useState(false)
    const [text, setText] = useState(type)

    const handleEleClick = (value, text)=>{
        onEleClick(value)
        setText(text)
        SetShowFilter(false)
    }
    return (
        <div className="">
            <div className="rounded-full border border-gray-500 py-1 pl-5 flex justify-between" >
                <h1 className="inline-block">{text}</h1>
                <ChevronDownIcon className="w-4 h-4 inline-block mt-1 mr-5 cursor-pointer"
                    onClick={() => SetShowFilter(!showFilter)}></ChevronDownIcon>
            </div>
            {
                showFilter &&
                <div className={`rounded-xl border bg-gray-300 absolute w-full shadow-md overflow-hidden `}>
                    <ul className="w-full">
                        {
                            filterData && filterData.map((data, i) => {
                                return <li key={i} className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1" onClick={()=>handleEleClick(data.value, data.view)}>{data.view}</li>
                            })
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default Filter