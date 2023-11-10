import { XMarkIcon, PlusCircleIcon, XCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { refreshToken } from '../../../utils/request'
import { getCounsellorById } from '../../../utils/departmentHead/counsellorRequest'
import blankAvt from "../../../assets/img/blankAvt.png"
import { addCounsellorField, deleteCousellorField, getFieldCounsellerNotHave } from '../../../utils/departmentHead/fieldRequest'

const AddCounsellorFieldModal = ({ cb, id }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [counsellorData, setCounsellorData] = useState({})
    const [fieldCounsellorNotHave, setFieldCounsellorNotHave] = useState([])
    const [chooseField, setChooseField] = useState([])
    const [showAddField, setShowAddField] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        if (isLoading) return
        setIsLoading(true)

        try {
            await refreshToken()
            const response = await getCounsellorById(id)
            const response2 = await getFieldCounsellerNotHave(id)
            console.log(response.data);
            if (response.success) {
                setCounsellorData(response.data)
            }
            if (response2.success) {
                setFieldCounsellorNotHave(response2.data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleFieldChoose = (object) => {
        if (isLoading) return
        let temp = [...chooseField, object]
        setChooseField(temp)
        temp = fieldCounsellorNotHave.filter((field) => field !== object)
        setFieldCounsellorNotHave(temp)
    }
    const handleFieldUnchoose = (object) => {
        if (isLoading) return
        let temp = [object, ...fieldCounsellorNotHave]
        setFieldCounsellorNotHave(temp)
        temp = chooseField.filter((field) => field !== object)
        setChooseField(temp)
    }

    const handleAddCounsellorField = async () => {
        if (isLoading) return
        if (!confirm('Bạn xác nhận thêm những field này cho nhân viên!!')) return
        setIsLoading(true)

        const ids = chooseField.map(field => field.id);

        try {
            await refreshToken()
            const response = await addCounsellorField(id, ids)
            if (response.success) {
                alert(response.message)
                setChooseField([])
                getData()
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteCousellorField = async (fieldId) => {
        if (isLoading) return
        if (!confirm('Xác nhận xóa !!')) return
        setIsLoading(true)

        try {
            await refreshToken()
            const response = await deleteCousellorField(id, fieldId)
            if (response.success) {
                alert(response.message)
                getData()
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-500/30 z-10`}>
            <div className="flex justify-center h-full items-center">
                <div>
                    <div className="bg-gray-200 rounded-md p-1 flex-col justify-center items-center flex">
                        <div className="bg-gray-300 w-full flex justify-end overflow-hidden">
                            <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white " onClick={() => { cb() }}></XMarkIcon>
                        </div>
                        <div className='flex m-1'>
                            <div>
                                <div class="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden w-[400px] mt-2">
                                    <div class="p-6">
                                        <img src={blankAvt} alt="Avatar" class="w-20 h-20 rounded-full mx-auto mb-4" />
                                        <h1 class="text-2xl font-bold text-center mb-2">{counsellorData.name}</h1>
                                        <p class="text-gray-600 text-center mb-4">{counsellorData.email}</p>
                                        <p class="text-gray-600 mb-2">Id: {counsellorData.id}</p>
                                        <p class="text-gray-600 mb-2">Số điện thoại: {counsellorData.phone}</p>
                                        <p class="text-gray-600">Role: Tư vấn viên</p>
                                    </div>
                                </div>
                                <h1 className='text-gray-900 bg-white mt-2 pl-2 border-b rounded-t-md'>Các lĩnh vực đảm nhận:</h1>
                                {Array.isArray(counsellorData.fields) && (counsellorData.fields.length !== 0) &&
                                    <div class="flex mb-2 w-[400px] bg-white shadow-lg flex-col h-[250px] overflow-y-scroll rounded-b-md">
                                        {counsellorData.fields &&
                                            counsellorData.fields.map((field, index) => {
                                                return (
                                                    <div key={index} className='flex m-1 pl-3 justify-between'>
                                                        <h1 className='cursor-default text-gray-600'>● {field.name}</h1>
                                                        <button
                                                            onClick={() => handleDeleteCousellorField(field.id)}><MinusCircleIcon className='h-6 w-6 text-red-500'></MinusCircleIcon></button>
                                                    </div>)
                                            })}

                                    </div>
                                }
                                {
                                    Array.isArray(counsellorData.fields) && (counsellorData.fields.length === 0) &&
                                    <div class="flex mb-2 w-[400px] bg-white shadow-lg flex-col h-[250px] items-center rounded-b-md">
                                        <h1 className='my-1'>Counsellor chưa đảm nhận lĩnh vực nào !!</h1>
                                    </div>
                                }
                                <div class="flex justify-center items-center mt-4 w-[400px] flex-col mb-1">
                                    <button className={`text-white  p-2 rounded-full ${showAddField ? "bg-red-500" : "bg-[#2CC168]"} min-w-[100px]`}
                                        onClick={() => setShowAddField(!showAddField)}
                                    ><PlusCircleIcon className={`h-6 w-6 text-white inline-block ${!showAddField ? "" : "hidden"}`}></PlusCircleIcon>
                                        <XCircleIcon className={`h-6 w-6 text-white inline-block ${!showAddField ? "hidden" : ""}`}></XCircleIcon>{showAddField ? "Hủy" : "Thêm"}</button>
                                </div>
                            </div>
                            {
                                showAddField &&
                                <div className=''>
                                    <h1 className='text-gray-900 bg-white mt-2 ml-2 pl-2 border-b rounded-t-lg'>Các lĩnh vực:</h1>
                                    <div className=' bg-white ml-2 shadow-lg overflow-y-scroll h-[287px] rounded-b-md'>
                                        {fieldCounsellorNotHave &&
                                            fieldCounsellorNotHave.map((field) => {
                                                return (
                                                    <div className='flex justify-between pl-3 hover:bg-blue-gray-100'>
                                                        <h1 className='cursor-default text-gray-600'>● {field.name}</h1>
                                                        <button><PlusCircleIcon className='h-6 w-6 text-[#2CC168]' onClick={() => handleFieldChoose(field)}></PlusCircleIcon></button>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                    <h1 className='text-gray-900 bg-white mt-2 ml-2 pl-2 border-b rounded-t-lg'>Đã chọn:</h1>
                                    <div className='bg-white ml-2 shadow-lg overflow-y-scroll h-[250px] rounded-b-md'>
                                        {chooseField &&
                                            chooseField.map((field) => {
                                                return (
                                                    <div className='flex justify-between m-1 pl-3 hover:bg-blue-gray-100'>
                                                        <h1 className='cursor-default '>● {field.name}</h1>
                                                        <button><MinusCircleIcon className='h-6 w-6 text-red-500' onClick={() => handleFieldUnchoose(field)}></MinusCircleIcon></button>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                    <div class="flex justify-center items-center mt-4 mb-1">
                                        <button className={`text-white  p-2 rounded-full  mb-2 ${chooseField.length === 0 ? "bg-gray-400 cursor-default" : "bg-[#2CC168]"} min-w-[100px]`}
                                            onClick={() => {
                                                if (chooseField.length === 0) return
                                                handleAddCounsellorField()
                                            }}
                                        ><PlusCircleIcon className={`h-6 w-6 text-white inline-block`}></PlusCircleIcon>
                                            Xác nhận</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCounsellorFieldModal