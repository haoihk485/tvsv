import { useEffect, useState } from "react"
import {
    PlusCircleIcon,
    PencilSquareIcon,
    ArrowDownIcon,
    MagnifyingGlassIcon,
    ArrowUpIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/solid'
import {
    DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline'


import { getCookie } from "../../utils/cookie"
import AddDepModal from "../../ui/admin/department/AddDepModal"
import Pagination from "../../components/Pagination"

import {
    addDepartment,
    getDeparments,
    updateDepartment,
    updateDepartmentStatus,
} from "../../utils/admin/departmentRequest"
import DepDetailModal from "../../ui/admin/department/DepDetailModal"
import UpdateDepartmentHeadModal from "../../ui/admin/department/UpdateDepartmentHeadModal"
import Switch from "../../components/Switch"
import { refreshToken } from "../../utils/request"

const Department = () => {
    const [showAddDepModal, setShowAddDepModal] = useState(false)
    const [showDetailDepModal, setShowDetailDepModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [tableData, setTableData] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [id, setId] = useState('')
    const avatarUrl = getCookie('avatarUrl')
    const [sortType, setSortType] = useState('asc')
    const [sortBy, setSortBy] = useState('name')
    const [searchKey, setSearchKey] = useState('')
    const [openStatusFilter, setOpenStatusFilter] = useState(false)
    const [statusFilter, setStatusFilter] = useState('all')
    const [showUpdatDHModal, setShowUpdatDHModal] = useState(false)

    useEffect(() => {
        getData(0)
    }, [sortBy, sortType, statusFilter])

    const getData = async (fowardPage) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            await refreshToken(fowardPage)
            const response = await getDeparments(fowardPage, sortBy, sortType, searchKey, statusFilter)
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

    const handleDataChange = (newData) => {
        setTableData(newData)
    }



    const pageHandle = (type) => {
        console.log('work');
        if (isLoading) return
        let fowardPage = 0
        switch (type) {
            case 'first':
                fowardPage = 0
                break;
            case 'final':
                fowardPage = totalPage - 1
                break;
            case 'next':
                fowardPage = page + 1
                break;
            case 'prev':
                fowardPage = page - 1
                break;
            default:
                break;
        }
        getData(fowardPage)
    }

    const nameDescSortHandle = () => {
        setSortBy('name')
        setSortType('desc')
    }

    const nameAscSortHandle = () => {
        setSortBy('name')
        setSortType('asc')
    }


    const searchHandle = async () => {
        if (isLoading) return
        getData(0)
    }

    const handleUpdateStatus = async (active, depId) => {
        if (isLoading) return
        const message = active ? "Bạn có chắc sẽ vô hiệu hóa phòng ban này?" : "Bạn có chắc sẽ mở khóa phòng ban này?"
        if (!confirm(message)) return
        setIsLoading(true)
        try {
            const response = await updateDepartmentStatus(depId)
            if (response.success) {
                getData(page)
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateDepartment = async (id, name, description) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            await refreshToken()
            const response = await updateDepartment(id, name, description)
            if (response.success) {
                alert(response.message)
                getData(page)
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddDepartment = async (depName, desc) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            await refreshToken()
            const response = await addDepartment(depName, desc)
            if (response.success) {
                alert(response.message)
                getData(0)
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {showUpdatDHModal && <UpdateDepartmentHeadModal cb={() => { setShowUpdatDHModal(false) }} id={id}></UpdateDepartmentHeadModal>}
            {showAddDepModal && <AddDepModal cb={() => { setShowAddDepModal(false) }} dataChange={handleAddDepartment}></AddDepModal>}
            {showDetailDepModal && <DepDetailModal cb={() => { setShowDetailDepModal(false) }} id={id} dataChange={handleUpdateDepartment}></DepDetailModal>}
            <div className="p-12">
                <div className="flex justify-between w-full mb-5 items-center">
                    <h1 className="font-bold text-3xl">Phòng Ban</h1>
                    <button className="bg-[#2CC168] rounded-full p-2 m-1 text-white" onClick={() => { setShowAddDepModal(true) }}>
                        <PlusCircleIcon className="w-6 h-6 text-white inline-block"></PlusCircleIcon> Thêm phòng ban</button>
                </div>
                <div className="mb-3">
                    <div className=' relative w-[80%] inline-block'>
                        <MagnifyingGlassIcon className='w-6 h-6 absolute m-1 right-0 cursor-pointer bg-blue-500 text-white rounded-full p-1' onClick={searchHandle}></MagnifyingGlassIcon>
                        <input type="text" className='w-full outline-none border border-gray-300 rounded-full pl-3 py-1 pr-9' placeholder="Tìm kiếm" value={searchKey} onChange={(e) => { setSearchKey(e.target.value) }} />
                    </div>
                    <div className="ml-[1%] w-[19%] relative inline-block">
                        <div className="rounded-full border border-gray-500 py-1 pl-5 flex justify-between" >
                            <h1 className="inline-block">{statusFilter === 'all' ? "Tất cả" : statusFilter === 'active' ? "Hoạt động" : "Dừng hoạt động"}</h1>
                            <ChevronDownIcon className="w-4 h-4 inline-block mt-1 mr-5 cursor-pointer"
                                onClick={() => { setOpenStatusFilter(!openStatusFilter) }}></ChevronDownIcon>
                        </div>
                        <div className={`rounded-xl border bg-gray-300 absolute w-full shadow-md ${openStatusFilter ? "" : "hidden"} overflow-hidden`}>
                            <ul className="w-full">
                                <li onClick={() => { setStatusFilter('all'); setOpenStatusFilter(false) }} className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1">Tất cả</li>
                                <li onClick={() => { setStatusFilter('active'); setOpenStatusFilter(false) }} className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1 border-y">Hoạt động</li>
                                <li onClick={() => { setStatusFilter('inactive'); setOpenStatusFilter(false) }} className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1">Dừng hoạt động</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div>
                    <table className="w-full rounded-lg overflow-hidden border-2">
                        <thead className="bg-gray-700 border-2 border-blue-gray-700 text-white">
                            <tr>
                                <th className="w-[5%]">STT</th>
                                <th className="w-[20%]">Tên phòng ban
                                    <ArrowDownIcon onClick={nameDescSortHandle} className={`inline-block w-4 h-4 ml-2  ${sortType === 'asc' ? "" : "hidden"} cursor-pointer`} ></ArrowDownIcon>
                                    <ArrowUpIcon onClick={nameAscSortHandle} className={`inline-block w-4 h-4 ml-2 cursor-pointer ${sortType === 'desc' ? "" : "hidden"}`} ></ArrowUpIcon>
                                </th>
                                <th className="w-[50%]">Miêu tả</th>
                                <th className='w-[15%]'>Trạng thái</th>
                                <th className="w-[5%]"></th>
                                <th className="w-[5%]"></th>
                            </tr>
                        </thead>
                        <tbody className="border border-blue-gray-700">
                            {
                                tableData.map((dep, i) => (
                                    <tr key={i} className={`${(i % 2 === 0) ? "" : "bg-gray-200"} h-[40px]`}>
                                        <td className="border-r text-center">{i + 1}</td>
                                        <td className="border-r ">{dep.name}</td>
                                        <td className="border-r ">{dep.description}</td>
                                        <td className='flex content-center justify-center h-[40px] border-r items-center'>
                                            <Switch id={dep.id} active={dep.status ? true : false} oC={handleUpdateStatus}></Switch>
                                        </td>
                                        <td className="text-center min-h-full"><PencilSquareIcon className="w-6 h-6 cursor-pointer"
                                            onClick={() => {
                                                setId(dep.id)
                                                setShowDetailDepModal(true)
                                            }} />
                                        </td>
                                        <td className="text-center min-h-full"><DocumentMagnifyingGlassIcon className={`w-6 h-6 cursor-pointer ${dep.status ? '' : 'text-gray-600 cursor-auto'}`}
                                            onClick={() => {
                                                if (!dep.status) return
                                                setId(dep.id)
                                                setShowUpdatDHModal(true)
                                            }} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination pageHandle={pageHandle} page={page} totalPage={totalPage}></Pagination>
            </div>
        </div>
    )
}

export default Department