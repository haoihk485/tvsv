import {
    PlusCircleIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    MinusCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/solid'
import Pagination from "../../components/Pagination"
import { useEffect, useState } from 'react'
import { refreshToken } from '../../utils/request'
import { deleteDepField, getAllDepField } from '../../utils/departmentHead/fieldRequest'
import AddFieldModal from '../../ui/departmenthead/field/AddFieldModal'



const DepartmentField = () => {
    const [showAddFieldModal, setShowAddFieldModal] = useState(false)
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const getData = async (forwardPage) => {
        if (isLoading) return
        setIsLoading(true)

        try {
            await refreshToken()
            const response = await getAllDepField(forwardPage)
            console.log(response);
            if (response.success) {
                setTableData(response.data.items)
                setPage(response.data.page)
                setTotalPage(response.data.pages)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData(0)
    }, [])

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

    const handleDeleteDepField = async (id) => {
        if (isLoading) return
        if (!(confirm('Bạn có chắc là muốn xóa lĩnh vực này?'))) return
        setIsLoading(true)

        try {
            await refreshToken()
            const response = await deleteDepField(id)
            if (response.success) {
                alert(response.message)
                getData(page)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    const searchHandle = () => { }
    return (
        <div>
            {showAddFieldModal && <AddFieldModal cb={() => setShowAddFieldModal(false)} dataChange={getData}></AddFieldModal>}
            <div className="p-12">
                <div className="flex justify-between w-full mb-5 items-center">
                    <h1 className="font-bold text-3xl">Lĩnh vực của phòng ban</h1>
                    <button className="bg-[#2CC168] rounded-full p-2 m-1 text-white" onClick={() => setShowAddFieldModal(true)}>
                        <PlusCircleIcon className="w-6 h-6 text-white inline-block"></PlusCircleIcon> Thêm lĩnh vực</button>
                </div>

                <div className="mb-3">
                    <div className=' relative w-full inline-block'>
                        <MagnifyingGlassIcon className='w-6 h-6 absolute m-1 right-0 cursor-pointer bg-blue-500 text-white rounded-full p-1'
                            onClick={searchHandle}></MagnifyingGlassIcon>
                        <input type="text" className='w-full outline-none border border-gray-300 rounded-full pl-3 py-1 pr-9' placeholder="Tìm kiếm" />
                    </div>
                </div>

                <div>
                    <table className='w-full border rounded-lg overflow-hidden'>
                        <thead className="bg-gray-700 border-2 border-blue-gray-700 text-white">
                            <tr>
                                <th className='w-[10%] border-r'>STT</th>
                                <th className='w-[75%] border-r'>Tên lĩnh vực</th>
                                <th className='w-[15%]'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData && tableData.map((field, i) => {
                                    return <tr key={i} className={`${i % 2 !== 0 ? 'bg-gray-200' : ''}`}>
                                        <th className='border-r font-normal'>{i + 1}</th>
                                        <th className='border-r text-left pl-5 font-normal'>{field.name}</th>
                                        <th className='flex justify-center content-center'>
                                            <button className='bg-[#ff4545] w-[50px] flex justify-center rounded-3xl m-1'
                                                onClick={() => handleDeleteDepField(field.id)}><XMarkIcon className='h-6 w-6 text-white'></XMarkIcon></button>
                                        </th>
                                    </tr>
                                })
                            }
                        </tbody>

                    </table>
                    {
                        (tableData.length === 0) && <div className='text-center'><h1>Không lấy được dữ liệu</h1></div>
                    }
                </div>
                <Pagination pageHandle={pageHandle} page={page} totalPage={totalPage}></Pagination>
            </div>
        </div>

    )
}

export default DepartmentField