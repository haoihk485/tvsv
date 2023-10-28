import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    PlusCircleIcon, PencilSquareIcon, ArrowDownIcon,
    MagnifyingGlassIcon, ArrowUpIcon,
    ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronDownIcon
} from '@heroicons/react/24/solid'

import blankAvt from '../../assets/img/blankAvt.png'
import { getCookie } from '../../utils/cookie';
import AdminNav from '../../ui/admin/AdminNav';
import { getAllField } from '../../utils/admin/fieldRequest'
import FieldDetailModal from '../../ui/admin/field/FieldDetailModal';
import AddFieldModal from '../../ui/admin/field/AddFieldModal';


const Field = () => {
    // Chuyển trang nếu không phải admin
    const navigate = useNavigate()
    const userRole = getCookie('role');
    const role = 'ROLE_ADMIN'

    useEffect(() => {
        if (!userRole) {
            console.log('worked');
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
    // ----------------------------------------------------------------------
    const avatarUrl = getCookie('avatarUrl')
    const [showAddFieldModal, setShowAddFieldModal] = useState(false)
    const [showFieldDetail, setShowFieldDetail] = useState(false)
    const [tableData, seTableData] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [sortBy, setSortBy] = useState('name')
    const [sortType, setSortType] = useState('asc')
    const [id, setId] = useState('')

    useEffect(() => {
        getAllField(0)
            .then(fetchdata => {
                fetchdata.data.items ? seTableData(fetchdata.data.items) : seTableData(tableData)
                if (fetchdata.data) {
                    setPage(fetchdata.data.page)
                    setTotalPage(fetchdata.data.pages)
                }
            })
            .catch(error => console.log(error))
    }, [])

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
            const response = await getAllField(fowardPage, sortBy, sortType)
            if (response.success === true) {
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

    const dataChange = (newvalue, page, totalPage) => {
        seTableData(newvalue)
        setPage(page)
        setTotalPage(totalPage)
    }




    return (
        <div>
            <AdminNav avatarUrl={avatarUrl ? avatarUrl : blankAvt}></AdminNav>
            <AddFieldModal show={showAddFieldModal} cb={() => setShowAddFieldModal(false)} dataChange={dataChange} page={page}></AddFieldModal>
            <FieldDetailModal show={showFieldDetail} cb={() => setShowFieldDetail(false)} id={id} dataChange={dataChange} page={page}></FieldDetailModal>
            <div className="p-12">
                <div className="flex justify-between w-full mb-5 items-center">
                    <h1 className="font-bold text-3xl">Lĩnh vực</h1>
                    <button className="bg-[#2CC168] rounded-full p-2 m-1 text-white" onClick={() => { setShowAddFieldModal(true) }}>
                        <PlusCircleIcon className="w-6 h-6 text-white inline-block"></PlusCircleIcon> Thêm lĩnh vực</button>
                </div>

                <div className="mb-3">
                    <div className=' relative w-[80%] inline-block'>
                        <MagnifyingGlassIcon className='w-6 h-6 absolute m-1 right-0 cursor-pointer bg-blue-500 text-white rounded-full p-1'></MagnifyingGlassIcon>
                        <input type="text" className='w-full outline-none border border-gray-300 rounded-full pl-3 py-1 pr-9' placeholder="Tìm kiếm" />
                    </div>
                    <div className="ml-[1%] w-[19%] relative inline-block">
                        <div className="rounded-full border border-gray-500 py-1 pl-5 flex justify-between" >
                            <h1 className="inline-block">all</h1>
                            <ChevronDownIcon className="w-4 h-4 inline-block mt-1 mr-5 cursor-pointer"></ChevronDownIcon>
                        </div>
                        <div className={`rounded-xl border bg-gray-300 absolute w-full shadow-md hidden overflow-hidden`}>
                            <ul className="w-full">
                                <li className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1">Tất cả</li>
                                <li className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1 border-y">Hoạt động</li>
                                <li className="cursor-pointer hover:bg-blue-gray-300 pl-5 py-1">Dừng hoạt động</li>
                            </ul>
                        </div>
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
                                tableData.map((field, i) => {
                                    return <tr key={i} className={`${i % 2 !== 0 ? 'bg-gray-200' : ''}`}>
                                        <th className='border-r font-normal'>{i + 1}</th>
                                        <th className='border-r text-left pl-5 font-normal'>{field.name}</th>
                                        <th className='flex justify-center content-center'><PencilSquareIcon className="w-6 h-6 cursor-pointer"
                                            onClick={() => {
                                                setId(field.id)
                                                setShowFieldDetail(true)
                                            }} /></th>
                                    </tr>
                                })
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

export default Field