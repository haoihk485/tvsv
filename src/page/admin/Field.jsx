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
import Pagination from '../../components/Pagination';


const Field = () => {
    const avatarUrl = getCookie('avatarUrl')
    const [showAddFieldModal, setShowAddFieldModal] = useState(false)
    const [showFieldDetail, setShowFieldDetail] = useState(false)
    const [tableData, seTableData] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [searchKey, setSearchKey] = useState('')
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
            const response = await getAllField(fowardPage, sortBy, sortType, searchKey)
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

    const searchHandle = async () => {
        if (isLoading) return
        setIsLoading(true)
        console.log('work');
        try {
            const response = await getAllField(0, sortBy, sortType, searchKey)
            if (response.success) {
                response.data.items ? seTableData(response.data.items) : seTableData(tableData)
                if (response.data) {
                    console.log(response);
                    setPage(response.data.page)
                    setTotalPage(response.data.pages)
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div>
            <AddFieldModal show={showAddFieldModal} cb={() => setShowAddFieldModal(false)} dataChange={dataChange} page={page}></AddFieldModal>
            <FieldDetailModal show={showFieldDetail} cb={() => setShowFieldDetail(false)} id={id} dataChange={dataChange} page={page}></FieldDetailModal>
            <div className="p-12">
                <div className="flex justify-between w-full mb-5 items-center">
                    <h1 className="font-bold text-3xl">Lĩnh vực</h1>
                    <button className="bg-[#2CC168] rounded-full p-2 m-1 text-white" onClick={() => { setShowAddFieldModal(true) }}>
                        <PlusCircleIcon className="w-6 h-6 text-white inline-block"></PlusCircleIcon> Thêm lĩnh vực</button>
                </div>

                <div className="mb-3">
                    <div className=' relative w-full inline-block'>
                        <MagnifyingGlassIcon className='w-6 h-6 absolute m-1 right-0 cursor-pointer bg-blue-500 text-white rounded-full p-1'
                            onClick={searchHandle}></MagnifyingGlassIcon>
                        <input type="text" className='w-full outline-none border border-gray-300 rounded-full pl-3 py-1 pr-9' placeholder="Tìm kiếm" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
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
                <Pagination pageHandle={pageHandle} page={page} totalPage={totalPage}></Pagination>
            </div>
        </div>
    )
}

export default Field