import { PlusCircleIcon, XMarkIcon, MinusCircleIcon } from '@heroicons/react/24/solid'

import { useEffect, useState } from 'react'
import { refreshToken } from '../../../utils/request'
import { addDepField, getFieldDepNotHave } from '../../../utils/departmentHead/fieldRequest'

const AddFieldModal = ({ cb, dataChange }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [dataTable, setDataTable] = useState([])
    const [chooseTable, setChooseTable] = useState([])

    useEffect(() => {
        getFieldData()
    }, [])

    const getFieldData = async () => {
        if (isLoading) return
        setIsLoading(true)

        try {
            await refreshToken()
            const response = await getFieldDepNotHave()
            console.log(response);
            if (response.success) {
                setDataTable(response.data)
            }


        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleFieldChoose = (object) => {
        if (isLoading) return
        let temp = [...chooseTable, object]
        setChooseTable(temp)
        temp = dataTable.filter((field) => field !== object)
        setDataTable(temp)
    }
    const handleFieldUnchoose = (object) => {
        if (isLoading) return
        let temp = [object, ...dataTable]
        setDataTable(temp)
        temp = chooseTable.filter((field) => field !== object)
        setChooseTable(temp)
    }
    const handleAddDepField = async() =>{
        if(isLoading) return
        if(!confirm('Bạn có chắc là sẽ thêm những lĩnh vực này?')) return
        setIsLoading(true)

        const ids = chooseTable.map(field => field.id);

        try {
            await refreshToken()
            const response = await addDepField(ids)
            if (response.success)
            {
                dataChange(0)
                alert(response.message);
                setChooseTable([])
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-500/30 z-20`}>
            <div className="flex justify-center h-full items-center">
                <div className="bg-white rounded-md  p-1 flex-col justify-center items-center flex min-w-[350px]">
                    <div className="bg-gray-300 w-full flex justify-end">
                        <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white " onClick={() => cb()}></XMarkIcon>
                    </div>
                    <div className='w-full flex flex-col mb-5'>
                        <h1 className='text-center text-lg m-1 text-blue-500'>Thêm Lĩnh Vực</h1>
                        <div className='flex justify-around mt-2'>
                            <h1 className='text-lg font-serif text-gray-700'>Các lĩnh vực</h1>
                            <h1 className='text-lg font-serif text-gray-700'>Lĩnh vực bạn chọn</h1>
                        </div>
                        <div className='flex justify-between items-center '>
                            <div className='h-[290px]  w-[300px] overflow-y-scroll border-2 shadow-lg m-2 mt-0'>
                                {dataTable && dataTable.map((field, index) => {
                                    return (
                                        <div className='flex justify-between m-1 pl-3 hover:bg-blue-gray-100'>
                                            <h1 className='cursor-default '>{field.name}</h1>
                                            <button><PlusCircleIcon className='h-6 w-6 text-[#2CC168]' onClick={() => handleFieldChoose(field)}></PlusCircleIcon></button>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='h-[290px]  w-[300px] overflow-y-scroll border-2 shadow-lg m-2 mt-0'>
                                {chooseTable && chooseTable.map((field, index) => {
                                    return (
                                        <div className='flex justify-between m-1 pl-3 hover:bg-blue-gray-100'>
                                            <h1 className='cursor-default '>{field.name}</h1>
                                            <button><MinusCircleIcon className='h-6 w-6 text-[#ff4545]' onClick={() => handleFieldUnchoose(field)}></MinusCircleIcon></button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <button className={`bg-[#2CC168] rounded-full p-2 m-1 text-white min-w-[100px] mb-2 ${chooseTable.length===0?"cursor-default bg-gray-300":""}`}
                        onClick={handleAddDepField}>
                        <PlusCircleIcon className='h-6 w-6 text-white inline-block'></PlusCircleIcon>Thêm</button>
                </div>
            </div>
        </div>
    )
}

export default AddFieldModal