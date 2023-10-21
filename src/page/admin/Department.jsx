import AdminNav from "../../components/AdminNav"
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { getCookie } from "../../utils/cookie"
import AddDepModal from "../../components/modal/AddDepModal"
import { useState } from "react"
const Department = () => {
    const [showAddDepModal, setShowAddDepModal] = useState(false)
    return (
        <div>
            <AddDepModal show={showAddDepModal} cb={() => { setShowAddDepModal(false) }}></AddDepModal>
            <AdminNav avatarUrl={getCookie('avatarUrl')}></AdminNav>
            <div className="p-12">
                <h1 className="font-bold text-3xl">Phòng Ban</h1>
                <div>
                    <table className="w-full">
                        <thead className="bg-gray-700 border-2 border-blue-gray-700 text-white">
                            <tr>
                                <th className="w-[20%]">Col1</th>
                                <th className="w-[70%]">Col2</th>
                                <th className="w-[10%]">Col3</th>
                            </tr>
                        </thead>
                        <tbody className="border border-blue-gray-700">
                            <tr>
                                <td>Row11</td>
                                <td>ROw21</td>
                                <td>Row31</td>
                            </tr>
                            <tr>
                                <td>Row11</td>
                                <td>ROw21</td>
                                <td>Row31</td>
                            </tr>

                        </tbody>
                    </table>
                    <div className="flex justify-center w-full">
                        <button className="bg-[#2CC168] rounded-full p-2 m-1 text-white" onClick={() => { setShowAddDepModal(true) }}>
                            <PlusCircleIcon className="w-6 h-6 text-white inline-block"></PlusCircleIcon> Thêm phòng ban</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Department