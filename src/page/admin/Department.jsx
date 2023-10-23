import { useEffect, useState } from "react"
import {
    PlusCircleIcon, PencilSquareIcon, ArrowDownIcon,
    MagnifyingGlassIcon, ChevronRightIcon, ChevronLeftIcon,
    ChevronDoubleLeftIcon, ChevronDoubleRightIcon
} from '@heroicons/react/24/solid'


import AdminNav from "../../components/AdminNav"
import { getCookie } from "../../utils/cookie"
import AddDepModal from "../../components/modal/AddDepModal"
import blankAvt from "../../assets/img/blankAvt.png"
import { getDeparments } from "../../utils/request"
import DepDetailModal from "../../components/modal/DepDetailModal"
const Department = () => {
    const [showAddDepModal, setShowAddDepModal] = useState(false)
    const [showDetailDepModal, setShowDetailDepModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [tableData, seTabletData] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [id, setId] = useState('')
    const avatarUrl = getCookie('avatarUrl')


    useEffect(() => {
        getDeparments(0)
            .then(fetchdata => {
                fetchdata.data.items ? seTabletData(fetchdata.data.items) : seTabletData(tableData)
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
            const response = await getDeparments(fowardPage)
            console.log(response)
            if (response.success === true) {
                console.log(response.data.page)
                response.data.items ? seTabletData(response.data.items) : seTabletData(tableData)
                if (response.data) {
                    setPage(response.data.page)
                }
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <AddDepModal show={showAddDepModal} cb={() => { setShowAddDepModal(false) }}></AddDepModal>
            <DepDetailModal show={showDetailDepModal} cb={() => { setShowDetailDepModal(false) }}  id={id}></DepDetailModal>
            <AdminNav avatarUrl={avatarUrl ? avatarUrl : blankAvt}></AdminNav>
            <div className="p-12">
                <div className="flex justify-between w-full mb-5 items-center">
                    <h1 className="font-bold text-3xl">Phòng Ban</h1>
                    <button className="bg-[#2CC168] rounded-full p-2 m-1 text-white" onClick={() => { setShowAddDepModal(true) }}>
                        <PlusCircleIcon className="w-6 h-6 text-white inline-block"></PlusCircleIcon> Thêm phòng ban</button>
                </div>
                <div className='mb-3 relative'>
                    <MagnifyingGlassIcon className='w-6 h-6 absolute m-1 right-0 cursor-pointer bg-blue-500 text-white rounded-full p-1'></MagnifyingGlassIcon>
                    <input type="text" className='w-full outline-none border border-gray-300 rounded-full pl-3 py-1 pr-9' />
                </div>
                <div>
                    <table className="w-full rounded-lg overflow-hidden border-2">
                        <thead className="bg-gray-700 border-2 border-blue-gray-700 text-white">
                            <tr>
                                <th className="w-[5%]">STT</th>
                                <th className="w-[20%]">Tên phòng ban
                                    <ArrowDownIcon className='inline-block w-4 h-4 ml-2 cursor-pointer'></ArrowDownIcon></th>
                                <th className="w-[60%]">Miêu tả</th>
                                <th className='w-[10%]'>Trạng thái</th>
                                <th className="w-[5%]"></th>
                            </tr>
                        </thead>
                        <tbody className="border border-blue-gray-700">
                            {
                                tableData.map((dep, i) => (
                                    <tr key={i} className={`${(i % 2 === 0) ? "" : "bg-gray-200"}`}>
                                        <td className="border-r text-center">{i + 1}</td>
                                        <td className="border-r ">{dep.name}</td>
                                        <td className="border-r ">{dep.description}</td>
                                        <td className='border-r text-center'>{dep.status ? "Hoạt động" : "Dừng hoạt động"}</td>
                                        <td className=" flex items-center justify-center"><PencilSquareIcon className="w-6 h-6 cursor-pointer" 
                                            onClick={()=>{
                                                setId(dep.id)
                                                setShowDetailDepModal(true)
                                            }}/></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-center items-center mt-3'>
                    <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${((totalPage <= 3 || page ===0)? "hidden" : "")}`}
                        onClick={()=>{pageHandle('first')}}>
                        <ChevronDoubleLeftIcon></ChevronDoubleLeftIcon>
                    </button>
                    <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${(page === 0) ? "hidden" : ""}`}
                        onClick={()=>{pageHandle('prev')}}>{page}</button>
                    <button className='bg-[#C12C85] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#C12C85]/80'>{page + 1}</button>
                    <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${(page === totalPage-1) ? "hidden" : ""}`}
                        onClick={()=>{pageHandle('next')}}>{page + 2}</button>
                    <button className={`bg-[#2CC168] p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-[#2CC168]/80 ${( (totalPage <= 3 || page === totalPage-1)? "hidden" : "")}`}
                        onClick={()=>{pageHandle('final')}}>
                        <ChevronDoubleRightIcon></ChevronDoubleRightIcon>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Department