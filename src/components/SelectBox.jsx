import { useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const SelectBox = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="relative w-[60%]">
            <div className="">
                <div className="bg-white py-2 pl-2 rounded-xl border w-full cursor-pointer flex flex-row justify-between" onClick={() => {
                    {
                        if(props.disabled === true){
                            setIsOpen(false)
                            return
                        }
                        setIsOpen(!isOpen)
                    }
                }}>
                    <p>{props.children}</p>
                    <ChevronDownIcon className="h-6 w-6 z-20 mr-3"></ChevronDownIcon>
                </div>
            </div>
            <div className={`absolute w-full ${isOpen ? "" : "hidden"} rounded-xl overflow-hidden`}>
                <ul >
                    {props.data && props.data.map((t, i) => {
                        return <li key={i} className="p-2 text-sm hover:bg-deep-orange-400 bg-gray-200 " value={t}
                            onClick={() => {
                                props.eleClick(t);
                                setIsOpen(false)
                            }}>{t}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default SelectBox