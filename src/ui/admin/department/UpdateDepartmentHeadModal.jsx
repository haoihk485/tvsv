import { useEffect, useState } from "react"
import {
    XMarkIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ArrowUpTrayIcon
} from "@heroicons/react/24/solid"

import SelectBox from "../../../components/SelectBox"
import { refreshToken } from "../../../utils/request"
import { getUserByDepartment } from "../../../utils/admin/userRequest"
import blankAvt from "../../../assets/img/blankAvt.png"
import { updateDepartmentHead } from "../../../utils/admin/departmentRequest"


const UpdateDepartmentHeadModal = ({ cb, id }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [dataTable, setDataTable] = useState([])
    const [depData, setDepData] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [selectBoxText, setSelectBoxText] = useState('Chọn phòng ban')
    const [depId, setDepId] = useState('')
    const [departmentHead, setDepartmentHead] = useState({})
    const [counsellerList, setCounsellerList] = useState([])


    useEffect(() => {
        getData(0)
    }, [])

    const getData = async (forwardPage) => {
        if (isLoading) return
        setIsLoading(true)

        try {
            await refreshToken()
            const response = await getUserByDepartment(id, forwardPage)
            if (response.success) {
                setDepartmentHead(response.data.departmentHead)
                setCounsellerList(response.data.counsellor.items)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        cb()
    }

    const HandleSelectBox = () => {

    }

    const handleUpdateDH = async(depId, userId, username) => {
        if (isLoading) return
        if (!confirm(`Bạn có muốn "${username}" làm trưởng phòng ban không?`))
        setIsLoading(true)

        try {
            await refreshToken()
            const response = await updateDepartmentHead(userId, depId)
            if (response.success)
            {
                alert(response.message)
                getData(0)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const pageHandle = () => {

    }


    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-500/30 z-20`}>
            <div className="flex justify-center items-center h-full">
                <div className="bg-white rounded-md p-1 flex-col justify-center items-center flex">
                    <div className="bg-gray-300 w-full flex justify-end overflow-hidden ">
                        <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white " onClick={handleClose}></XMarkIcon>
                    </div>
                    <h1 className="my-5 text-2xl font-bold">Danh sách nhân viên</h1>
                    <div className=" min-w-[550px]">
                        <div className="flex items-center m-1 text-white p-2 rounded-lg border-2 bg-[#2CC168]">
                            <img src={!departmentHead ? blankAvt : departmentHead.avatar ? departmentHead.avatar : blankAvt} alt="" className="w-[50px] h-[50px] rounded-lg" />
                            <h1 className="ml-3 font-semibold w-[150px] text-left">
                                {!departmentHead ? "Chưa có trưởng phòng ban" : departmentHead.name ? departmentHead.name : "Chưa có trưởng phòng ban"}
                            </h1>
                            <p className="w-[250px]">{!departmentHead ? "" : departmentHead.email ? departmentHead.email : ""}</p>
                            <button className="bg-[#2CC168] p-1 rounded-lg w-[50px] flex justify-center"
                            ><ArrowUpTrayIcon className="w-6 h-6 "></ArrowUpTrayIcon></button>
                        </div>
                        {counsellerList && counsellerList.map((data, index) => {

                            return (
                                <div key={index} className="flex items-center m-1 bg-gray-300 p-2 rounded-lg border-2 border-[#2CC168]">
                                    <img src={data.avatar ? data.avatar : blankAvt} alt="" className="w-[50px] h-[50px] rounded-lg" />
                                    <h1 className="ml-3 font-semibold w-[150px] text-left">{data.name}</h1>
                                    <p className="w-[250px]">{data.email}</p>
                                    <button className="bg-[#2CC168] p-1 rounded-lg w-[50px] flex justify-center"
                                        onClick={() => { handleUpdateDH(id, data.id, data.name) }}><ArrowUpTrayIcon className="w-6 h-6 "></ArrowUpTrayIcon></button>
                                </div>
                            )
                        })}
                        {
                            (counsellerList.length === 0) &&
                            <div className="text-center p-2 m-1 rounded-lg">
                                <h1 className="">Phòng ban không có nhân viên</h1>
                            </div>
                        }

                        {totalPage !== 0 &&
                            <div className='flex justify-center items-center mt-3'>
                                <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${((totalPage <= 3 || page === 0) ? "hidden" : "")}`}
                                    onClick={() => { pageHandle('first') }}>
                                    <ChevronDoubleLeftIcon></ChevronDoubleLeftIcon>
                                </button>
                                <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${(page === 0) ? "hidden" : ""}`}
                                    onClick={() => { pageHandle('prev') }}>{page}</button>
                                <button className='bg-[#C12C85] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#C12C85]/80'>{page + 1}</button>
                                <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${(page === totalPage - 1) ? "hidden" : ""}`}
                                    onClick={() => { pageHandle('next') }}>{page + 2}</button>
                                <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${((totalPage <= 3 || page === totalPage - 1) ? "hidden" : "")}`}
                                    onClick={() => { pageHandle('final') }}>
                                    <ChevronDoubleRightIcon></ChevronDoubleRightIcon>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateDepartmentHeadModal