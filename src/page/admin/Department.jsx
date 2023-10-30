import { useEffect, useState } from "react"
import {
    PlusCircleIcon, PencilSquareIcon, ArrowDownIcon,
    MagnifyingGlassIcon, ArrowUpIcon,
    ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronDownIcon
} from '@heroicons/react/24/solid'


import AdminNav from "../../ui/admin/AdminNav"
import { getCookie } from "../../utils/cookie"
import AddDepModal from "../../ui/admin/department/AddDepModal"
import blankAvt from "../../assets/img/blankAvt.png"
import { getDeparments, updateDepartmentStatus } from "../../utils/admin/departmentRequest"
import DepDetailModal from "../../ui/admin/department/DepDetailModal"
import { useNavigate } from "react-router-dom"
import Switch from "../../components/Switch"
import { refreshToken } from "../../utils/request"

const Department = () => {

    // Chuyển trang nếu không phải admin
    const navigate = useNavigate()
    const userRole = getCookie('role');
    const role = 'ROLE_ADMIN'

    useEffect(() => {
        if (!userRole) {
            return navigate('/')
        }
        const roleToURL = {
            ROLE_USER: '/',
            ROLE_ADMIN: '/admin',
            ROLE_SUPERVISOR: '/supervisor',
            ROLE_COUNSELLOR: '/counsellor',
            ROLE_DEPARTMENT_HEAD: '/department-head',
        };
        if (roleToURL[role]) {
            if (role === userRole) {
                return;
            }
            navigate(roleToURL[role]);
        } else {
            console.error('Vai trò không hợp lệ:');
        }
    }, [])



    const [showAddDepModal, setShowAddDepModal] = useState(false)
    const [showDetailDepModal, setShowDetailDepModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [tableData, seTableData] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [id, setId] = useState('')
    const avatarUrl = getCookie('avatarUrl')
    const [sortType, setSortType] = useState('asc')
    const [sortBy, setSortBy] = useState('name')
    const [searchKey, setSearchKey] = useState('')
    const [openStatusFilter, setOpenStatusFilter] = useState(false)
    const [statusFilter, setStatusFilter] = useState('all')

    useEffect(() => {
        // document.cookie = 'sortBy=name'
        // document.cookie = 'sortType=asc'

        getDeparments(0, sortBy, sortType)
            .then(fetchdata => {
                fetchdata.data.items ? seTableData(fetchdata.data.items) : seTableData(tableData)
                if (fetchdata.data) {
                    setPage(fetchdata.data.page)
                    setTotalPage(fetchdata.data.pages)
                }
            })
            .catch(error => console.log(error))
    }, [])

    const handleDataChange = (newData) => {
        seTableData(newData)
    }



    const pageHandle = async (type) => {
        if (isLoading) return
        setIsLoading(true)
        let fowardPage = page
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
        try {
            console.log(sortType)
            const response = await getDeparments(fowardPage, sortBy, sortType, searchKey, statusFilter)
            console.log(response)
            if (response.success === true) {
                console.log(response.data.page)
                response.data.items ? seTableData(response.data.items) : seTableData(tableData)
                if (response.data) {
                    setPage(response.data.page)
                    setTotalPage(response.data.pages)
                }
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    const nameDescSortHandle = () => {
        setSortBy('name')
        setSortType('desc')
    }

    const nameAscSortHandle = () => {
        setSortType('asc')
        setSortBy('name')
    }

    const sort = async () => {
        if (isLoading) return
        setIsLoading(true)

        try {
            const response = await getDeparments(0, sortBy, sortType, searchKey, statusFilter)
            if (response.success === true) {
                seTableData(response.data.items)
                setPage(0)
                setTotalPage(response.data.pages)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        sort()
    }, [sortType, statusFilter])

    const searchHandle = async () => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const response = await getDeparments(0, sortBy, sortType, searchKey, statusFilter)
            if (response.success === true) {
                seTableData(response.data.items)
                setPage(0)
                setTotalPage(response.data.pages)
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    const switchHandle = async (active, depId) => {
        if (!confirm(active ? "Bạn chắc chắn muốn khóa phòng ban này?" : "Bạn chắc chắn muốn mở khóa phòng ban này?")) return
        if (isLoading) return
        setIsLoading(true)
        try {
            await refreshToken()
            const response = await updateDepartmentStatus(depId)
            if (response.success) {
                alert('Cập nhật trạng thái thành công')
                const response2 = await getDeparments(page, sortBy, sortType, searchKey, statusFilter)
                seTableData(response2.data.items)
                setPage(response2.data.page)
                setTotalPage(response2.data.pages)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            console.log(isLoading)
            setIsLoading(false)
        }
    }

    return (
        <div>
            <AddDepModal show={showAddDepModal} cb={() => { setShowAddDepModal(false) }}></AddDepModal>
            <DepDetailModal show={showAddDepModal} cb={() => { setShowDetailDepModal(false) }} id={id} dataChange={handleDataChange} page={page}></DepDetailModal>
            <AdminNav avatarUrl={avatarUrl ? avatarUrl : blankAvt}></AdminNav>
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
                            <h1 className="inline-block">{statusFilter==='all'?"Tất cả":statusFilter==='active'?"Hoạt động":"Dừng hoạt động"}</h1>
                            <ChevronDownIcon className="w-4 h-4 inline-block mt-1 mr-5 cursor-pointer"
                                onClick={() => {setOpenStatusFilter(!openStatusFilter)}}></ChevronDownIcon>
                        </div>
                        <div className= {`rounded-xl border bg-gray-300 absolute w-full shadow-md ${openStatusFilter?"":"hidden"} overflow-hidden`}>
                            <ul className="w-full">
                                <li onClick={()=>{setStatusFilter('all');setOpenStatusFilter(false)}} className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1">Tất cả</li>
                                <li onClick={()=>{setStatusFilter('active');setOpenStatusFilter(false)}} className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1 border-y">Hoạt động</li>
                                <li onClick={()=>{setStatusFilter('inactive');setOpenStatusFilter(false)}} className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1">Dừng hoạt động</li>
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
                                <th className="w-[60%]">Miêu tả</th>
                                <th className='w-[10%]'>Trạng thái</th>
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
                                        {/* <td className='border-r text-center'>{dep.status ? "Hoạt động" : "Dừng hoạt động"}</td> */}
                                        <td className='flex content-center justify-center h-[40px] border-r items-center'>
                                            <Switch id={dep.id} active={dep.status ? true : false} oC={switchHandle}></Switch>
                                        </td>
                                        <td className="text-center min-h-full"><PencilSquareIcon className="w-6 h-6 cursor-pointer"
                                            onClick={() => {
                                                setId(dep.id)
                                                setShowDetailDepModal(true)
                                            }} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
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
            </div>
        </div>
    )
}

export default Department