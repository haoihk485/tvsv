import { useState } from "react"

import AdminNav from "../../ui/admin/AdminNav"
import { getCookie } from "../../utils/cookie"
import {
    PlusCircleIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    BriefcaseIcon
} from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


import AddUserModal from "../../ui/admin/user/AddUserModal"
import blankAvt from "../../assets/img/blankAvt.png"
import { refreshToken } from "../../utils/request"
import { getAllUser, updateUserStatus } from "../../utils/admin/userRequest"
import Filter from "../../ui/admin/user/Filter"
import Switch from "../../components/Switch"
import CoordinateModal from "../../ui/admin/user/CoordinateModal"
import Pagination from "../../components/Pagination"


const User = () => {
    // Chuyển trang nếu không phải admin
    const [showAddUserModal, setShowAddUserModal] = useState(false)
    const [showCoordinateModal, setShowCoordinateModal] =useState(false)
    const avatarUrl = getCookie('avatarUrl') ? getCookie('avatarUrl') : blankAvt
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [searchKey, setSearchKey] = useState('')
    const [occupation, setOccupation] = useState('')
    const [sortRole, setSortRole] = useState('')
    const [status, setStatus] = useState('')
    const [dataTable, setDataTable] = useState([])
    const [sort, setSort] = useState([{ by: 'name', type: 'asc' }, { by: 'email', type: 'asc' }, { by: 'phone', type: 'asc' }])
    const statusFilterData = [
        { view: "Trạng thái", value: "all" },
        { view: "Hoạt động", value: "enabled" },
        { view: "Vô hiệu", value: "disabled" }
    ]
    const roleFilterData = [
        { view: "Phân quyền", value: "all" },
        { view: "Giám sát", value: "supervisor" },
        { view: "Trưởng phòng", value: "departmentHead" },
        { view: "Người dùng", value: "user" },
        { view: "Nhân viên", value: "counsellor" }
    ]
    const occupationFilterData = [
        { view: "Nghề nghiệp", value: "all" },
        { view: "Học Sinh", value: "Học%20Sinh" },
        { view: "Sinh Viên", value: "Sinh%20Viên" },
        { view: "Cựu Sinh Viên", value: "Cựu%20Sinh%20Viên" },
        { view: "Phụ Huynh", value: "Phụ%20Huynh" }
    ]

    useEffect(() => {
        getData(0)
    }, [sort, status, sortRole, occupation])

    const getData = async (fowardPage) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            await refreshToken()
            const response = await getAllUser(fowardPage, searchKey, occupation, sortRole, status, sort)
            if (response.success) {
                console.log(response.data);
                setDataTable(response.data.items)
                setPage(response.data.page)
                setTotalPage(response.data.pages)
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }

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

    const sortHandle = (sortBy, sortType) => {
        if (isLoading) return
        const newSort = [...sort]
        switch (sortBy) {
            case 'name':
                newSort[0] = { ...newSort[0], type: sortType }
                setSort(newSort)
                break;
            case 'email':
                newSort[1] = { ...newSort[1], type: sortType }
                setSort(newSort)
                break;
            case 'phone':
                newSort[2] = { ...newSort[2], type: sortType }
                setSort(newSort)
                break;
            default:
                break;
        }
    }
    const handleStatusSort = (value) => {
        if (isLoading) return
        setStatus(value)
    }

    const handleRoleSort = (value) => {
        if (isLoading) return
        setSortRole(value)
    }

    const handleOccupationSort = (value) => {
        if (isLoading) return
        setOccupation(value)
    }

    const handleSearch = () => {
        getData(0)
    }

    const handleUpdateStatus = async (active, id) => {
        if (isLoading) return
        const message = active ? "Bạn có chắc sẽ vô hiệu hóa người dùng" : "Bạn có chắc sẽ mở khóa người dùng"
        if (!confirm(message)) return
        setIsLoading(true)
        try {
            const response = await updateUserStatus(id)
            if (response.success) {
                getData(page)
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {showAddUserModal && <AddUserModal cb={() => { setShowAddUserModal(false) }} dataChange={getData}></AddUserModal>}
            {showCoordinateModal && <CoordinateModal cb={() => { setShowCoordinateModal(false) }}></CoordinateModal>}
            

            <div className="p-12">
                <div className="flex justify-between w-full mb-5 items-center">
                    <h1 className="font-bold text-3xl">Nhân sự</h1>
                    <div>
                        <button className="bg-[#2CC168] rounded-full p-2 m-1 text-white" onClick={() => { setShowAddUserModal(true) }}>
                            <PlusCircleIcon className="w-6 h-6 text-white inline-block"></PlusCircleIcon>Thêm nhân sự</button>
                        <button className="bg-[#2CC168] rounded-full p-2 m-1 text-white" onClick={() => { setShowCoordinateModal(true) }}>
                            <BriefcaseIcon className="w-6 h-6 text-white inline-block"></BriefcaseIcon>Phân phối nhân sự</button>
                    </div>
                </div>
                <div className="mb-3">
                    <div className=' relative w-[56%] inline-block'>
                        <MagnifyingGlassIcon className='w-6 h-6 absolute m-1 right-0 cursor-pointer bg-blue-500 text-white rounded-full p-1' onClick={handleSearch}></MagnifyingGlassIcon>
                        <input type="text" className='w-full outline-none border border-gray-300 rounded-full pl-3 py-1 pr-9'
                            placeholder="Tìm kiếm"
                            values={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                        />
                    </div>
                    <div className="ml-[1%] w-[17%] relative inline-block">
                        <Filter type={'Nghề nghiệp'} filterData={occupationFilterData} onEleClick={handleOccupationSort}></Filter>
                    </div>
                    <div className="ml-[1%] w-[12%] relative inline-block">
                        <Filter type={'Phân quyền'} filterData={roleFilterData} onEleClick={handleRoleSort}></Filter>
                    </div>
                    <div className="ml-[1%] w-[12%] relative inline-block">
                        <Filter type={'Trạng thái'} filterData={statusFilterData} onEleClick={handleStatusSort}></Filter>
                    </div>
                </div>
                <div>
                    <table className="w-full  overflow-hidden rounded-lg">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="w-[20%] text-left">
                                    <p className="inline-block">Người Dùng</p>
                                    <ArrowDownIcon onClick={() => { sortHandle('name', 'desc') }} className={`ml-1 cursor-pointer inline-block h-4 w-4 ${sort[0].type === 'asc' ? '' : 'hidden'}`}></ArrowDownIcon>
                                    <ArrowUpIcon onClick={() => { sortHandle('name', 'asc') }} className={`ml-1 cursor-pointer inline-block h-4 w-4 ${sort[0].type === 'asc' ? 'hidden' : ''}`}></ArrowUpIcon>
                                </th>
                                <th className="w-[20%] text-left">
                                    <p className="inline-block">Email</p>
                                    <ArrowDownIcon onClick={() => { sortHandle('email', 'desc') }} className={`ml-1 cursor-pointer inline-block h-4 w-4 ${sort[1].type === 'asc' ? '' : 'hidden'}`}></ArrowDownIcon>
                                    <ArrowUpIcon onClick={() => { sortHandle('email', 'asc') }} className={`ml-1 cursor-pointer inline-block h-4 w-4 ${sort[1].type === 'asc' ? 'hidden' : ''}`}></ArrowUpIcon>
                                </th>
                                <th className="w-[15%] text-left">
                                    <p className="inline-block">Số điện thoại</p>
                                    <ArrowDownIcon onClick={() => { sortHandle('phone', 'desc') }} className={`ml-1 cursor-pointer inline-block h-4 w-4 ${sort[2].type === 'asc' ? '' : 'hidden'}`}></ArrowDownIcon>
                                    <ArrowUpIcon onClick={() => { sortHandle('phone', 'asc') }} className={`ml-1 cursor-pointer inline-block h-4 w-4 ${sort[2].type === 'asc' ? 'hidden' : ''}`}></ArrowUpIcon></th>
                                <th className="w-[15%] text-left">Nghề nghiệp</th>
                                <th className="w-[15%] text-left">ROLE</th>
                                <th className="w-[15%] text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {dataTable.map((user) => {
                                return (
                                    <tr key={user.id} className=" border-b-2 border-gray-400">
                                        <td className="flex">
                                            <img src={user.avatar ? user.avatar : blankAvt} alt="ảnh người dùng" className="w-[70px] h-[70px] m-1" />
                                            <h1 className="ml-5 self-center font-bold">{user.name}</h1>
                                        </td>
                                        <td className="ml-1">{user.email}</td>
                                        <td className="ml-1">{user.phone}</td>
                                        <td className="ml-1">{user.occupation}</td>
                                        <td className="ml-1">{
                                            user.role === 'ROLE_SUPERVISOR' ? 'Giám sát viên' :
                                                user.role === 'ROLE_DEPARTMENT_HEAD' ? 'Trưởng phòng ban' :
                                                    user.role === 'ROLE_COUNSELLOR' ? 'Tư vấn viên' : 'Người dùng'}</td>
                                        <td className="ml-1"><Switch id={user.id} active={user.enabled ? true : false} oC={handleUpdateStatus}></Switch></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Pagination pageHandle={pageHandle} page={page} totalPage={totalPage}></Pagination>
            </div>
        </div>
    )
}
export default User