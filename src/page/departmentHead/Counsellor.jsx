import { useState } from "react"

import {
    PlusCircleIcon,
    MagnifyingGlassIcon,
    ArrowDownIcon,
    ArrowUpIcon,
} from '@heroicons/react/24/solid'
import {
    BriefcaseIcon,

} from '@heroicons/react/24/outline'
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
import { AddDepCounsellor, getAllDepCounsellor, updateConsellorStatus } from "../../utils/departmentHead/counsellorRequest"
import AddCounsellorModal from "../../ui/departmenthead/counsellor/AddCounsellorModal"
import fieldEdit from "../../assets/img/fieldEdit.jpg"
import AddCounsellorFieldModal from "../../ui/departmenthead/counsellor/AddCounsellorFieldModal"

const Counsellor = () => {

    const [showAddCounsellorModal, setShowAddCounsellorModal] = useState(false)
    const [showAddCounsellorFieldModal, setShowAddCounsellorFieldModal] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [dataTable, setDataTable] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [searchKey, setSearchKey] = useState('')
    const [sortType, setSortType] = useState('asc')

    const [counsellorId, setCounsellorId] = useState('')

    useEffect(() => {
        getData(0)
    }, [sortType])


    const getData = async (forwardPage) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            console.log('work');
            await refreshToken()
            const response = await getAllDepCounsellor(forwardPage, sortType, searchKey)
            if (response.success) {
                setDataTable(response.data.items)
                setPage(response.data.page)
                setTotalPage(response.data.pages)
            }
        } catch (error) {
            log(error)
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

    const handleAddCounsellor = async (name, email, phone, password) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            await refreshToken()
            const response = await AddDepCounsellor(name, email, phone, password)
            alert(response.message)
            if (response.success) {
                getData(0)
            }
        } catch (error) {
            console.log(response);
            console.log(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    const handleSort = (type) =>{
        if(isLoading) return
        setSortType(type)
    }

    const handleSearch = () =>{
        getData(0)
    }

    const handleUpdateStatus = async(active, id) =>{
        if (isLoading) return
        if (!confirm(active?'Bạn có muốn khóa người dùng?':'Bạn có muốn mở khóa cho người dùng?')) return
        setIsLoading(true)
        try {
            const response = await updateConsellorStatus(id)
            if (response.success){
                getData(0)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {showAddCounsellorModal && <AddCounsellorModal cb={() => setShowAddCounsellorModal(false)} dataChange={handleAddCounsellor}></AddCounsellorModal>}
            {showAddCounsellorFieldModal && <AddCounsellorFieldModal cb={() => setShowAddCounsellorFieldModal(false)} id={counsellorId}></AddCounsellorFieldModal>}
            <div className="p-12">
                <div className="flex justify-between w-full mb-5 items-center">
                    <h1 className="font-bold text-3xl">Nhân sự</h1>
                    <div>
                        <button className="bg-[#2CC168] rounded-full p-2 m-1 text-white" onClick={() => setShowAddCounsellorModal(true)}>
                            <PlusCircleIcon className="w-6 h-6 text-white inline-block"></PlusCircleIcon>Thêm tư vấn viên</button>
                    </div>
                </div>
                <div className="mb-3">
                    <div className=' relative w-[87%] inline-block'>
                        <MagnifyingGlassIcon className='w-6 h-6 absolute m-1 right-0 cursor-pointer bg-blue-500 text-white rounded-full p-1'
                        onClick={handleSearch}></MagnifyingGlassIcon>
                        <input type="text" className='w-full outline-none border border-gray-300 rounded-full pl-3 py-1 pr-9'
                            placeholder="Tìm kiếm"
                            value={searchKey}
                            onChange={(e)=>setSearchKey(e.target.value)}
                        />
                    </div>
                    <div className="ml-[1%] w-[12%] relative inline-block">
                        <Filter type={'Trạng thái'}></Filter>
                    </div>
                </div>
                <div>
                    <table className="w-full  overflow-hidden rounded-lg">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="w-[20%] text-left">
                                    <p className="inline-block">Người Dùng</p>
                                    <ArrowDownIcon className={`ml-1 cursor-pointer inline-block h-4 w-4 ${sortType === 'asc' ? '' : 'hidden'}`} onClick={()=>handleSort('desc')}></ArrowDownIcon>
                                    <ArrowUpIcon className={`ml-1 cursor-pointer inline-block h-4 w-4 ${sortType === 'asc' ? 'hidden' : ''}`} onClick={()=>handleSort('asc')}></ArrowUpIcon>
                                </th>
                                <th className="w-[20%] text-left">
                                    <p className="inline-block">Email</p>
                                    {/* <ArrowDownIcon className={`ml-1 cursor-pointer inline-block h-4 w-4 ${true === 'asc' ? '' : 'hidden'}`}></ArrowDownIcon> */}
                                    {/* <ArrowUpIcon className={`ml-1 cursor-pointer inline-block h-4 w-4 ${true === 'asc' ? 'hidden' : ''}`}></ArrowUpIcon> */}
                                </th>
                                <th className="w-[15%] text-left">
                                    <p className="inline-block">Số điện thoại</p>
                                    {/* <ArrowDownIcon className={`ml-1 cursor-pointer inline-block h-4 w-4 ${true === 'asc' ? '' : 'hidden'}`}></ArrowDownIcon> */}
                                    {/* <ArrowUpIcon className={`ml-1 cursor-pointer inline-block h-4 w-4 ${true === 'asc' ? 'hidden' : ''}`}></ArrowUpIcon> */}
                                </th>
                                <th className="w-[15%] text-left">Nghề nghiệp</th>
                                <th className="w-[15%] text-left">ROLE</th>
                                <th className="w-[10%] text-left">Status</th>
                                <th className="w-[5%] text-left"></th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {dataTable && (dataTable.length !== 0) &&
                                dataTable.map((user) => {
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
                                            <td className="">
                                                <BriefcaseIcon className="w-8 h-8 hover:opacity-50 cursor-pointer"
                                                    onClick={()=>{
                                                        setCounsellorId(user.id)
                                                        setShowAddCounsellorFieldModal(true)}
                                                        }></BriefcaseIcon>
                                            </td>
                                        </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination pageHandle={pageHandle} page={page} totalPage={totalPage}></Pagination>
            </div>
        </div>
    )
}

export default Counsellor