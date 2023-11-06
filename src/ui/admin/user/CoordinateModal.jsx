import {
    XMarkIcon,
    ArrowUpTrayIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import { refreshToken } from "../../../utils/request"
import { getUserWithoutDep, updateUserDepartment } from "../../../utils/admin/userRequest"
import blankAvt from "../../../assets/img/blankAvt.png"
import SelectBox from "../../../components/SelectBox"
import { getActiveDepartments } from "../../../utils/admin/departmentRequest"
import { data } from "autoprefixer"

const CoordinateModal = ({ cb }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [searchKey, setSearchKey] = useState('')
    const [dataTable, setDataTable] = useState([])
    const [depData, setDepData] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [selectBoxText, setSelectBoxText] = useState('Chọn phòng ban')
    const [depId, setDepId] = useState('')



    useEffect(() => {
        getData(page)
    }, [page])

    useEffect(() => {
        getDepartmentData()
    }, [])

    const getDepartmentData = async () => {
        try {
            const response = await getActiveDepartments();
            console.log(response);
            if (response.success) {
                setDepData(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {

        }
    };

    const HandleSelectBox = (text, value) => {
        setSelectBoxText(text)
        setDepId(value)
    }


    const getData = async (fowardPage) => {
        if (isLoading) return
        setIsLoading(true)

        try {
            await refreshToken()
            const response = await getUserWithoutDep(fowardPage, searchKey, 5)
            if (response.success) {
                console.log(response.data.items)
                setPage(response.data.page)
                setTotalPage(response.data.pages)
                setDataTable(response.data.items)
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

    const pageHandle = (type) => {
        if (isLoading) return
        setIsLoading(true)
        let forwardPage = 0
        try {
            switch (type) {
                case 'first':
                    forwardPage = 0
                    break;
                case 'final':
                    forwardPage = totalPage - 1
                    break;
                case 'next':
                    forwardPage = page + 1
                    break;
                case 'prev':
                    forwardPage = page - 1
                    break;
                default:
                    break;
            }
            getData(forwardPage)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const HandleUpdateUserDepartment = async (userId, username) => {
        if (isLoading) return
        if (!depId) {
            alert('Vui lòng chọn phòng ban!!')
            return
        }
        if (!confirm(`Bạn có muốn thêm nhân viên "${username}" vào phòng ban "${selectBoxText}"`))
            setIsLoading(true)

        try {
            await refreshToken()
            const response = await updateUserDepartment(userId, depId)
            if (response.success) {
                alert(response.message)
                getData(0)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`fixed top-0 bottom-0 right-0 left-0 bg-gray-500/30 z-20`}>
            <div className="flex justify-center items-center h-full">
                <div className="bg-white rounded-md p-1 flex-col justify-center items-center flex">
                    <div className="bg-gray-300 w-full flex justify-end overflow-hidden ">
                        <XMarkIcon className="w-4 h-4 cursor-pointer bg-red-500 text-white " onClick={handleClose}></XMarkIcon>
                    </div>
                    <h1 className="my-5 text-2xl font-bold">Phân phối nhân sự</h1>
                    <div className=" min-w-[550px]">
                        <div className=" flex justify-between items-center p-2 bg-[#2CC168] m-1 rounded-lg">
                            <p className="text-md font font-semibold text-white">Chọn phòng ban: </p>
                            <SelectBox data={depData} eleClick={HandleSelectBox}>{selectBoxText}</SelectBox>
                        </div>
                        {dataTable && dataTable.map((data, index) => {
                            return (
                                <div key={index} className="flex items-center m-1 bg-gray-300 p-2 rounded-lg border-2 border-[#2CC168]">
                                    <img src={data.avatar ? data.avatar : blankAvt} alt="" className="w-[50px] h-[50px] rounded-lg" />
                                    <h1 className="ml-3 font-semibold w-[150px] text-left">{data.name}</h1>
                                    <p className="w-[250px]">{data.email}</p>
                                    <button className="bg-[#2CC168] p-1 rounded-lg w-[50px] flex justify-center"
                                        onClick={() => { HandleUpdateUserDepartment(data.id, data.name) }}><ArrowUpTrayIcon className="w-6 h-6 "></ArrowUpTrayIcon></button>
                                </div>
                            )
                        })}
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

export default CoordinateModal
