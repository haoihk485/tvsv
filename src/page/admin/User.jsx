import AdminNav from "../../components/AdminNav"
import { getCookie } from "../../utils/cookie"
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import AddUserModal from "../../components/modal/AddUserModal"
import { useState } from "react"

const User = () => {
    const [showAddUserModal, setShowAddUserModal] = useState(false)
    

    return (
        <div>
            <AddUserModal show={showAddUserModal} cb={()=>{setShowAddUserModal(false)}}></AddUserModal>
            <AdminNav avatarUrl={getCookie('avatarUrl')}></AdminNav>
            <div className="p-12">
                <h1 className="font-bold text-3xl">Người Dùng</h1>
                <div>
                    <table className="w-full">
                        <thead className="bg-gray-700 border-2 border-blue-gray-700 text-white">
                            <tr>
                                <th className="w-[20%] text-left">STT</th>
                                <th className="w-[70%] text-left">Tên Người Dùng</th>
                                <th className="w-[10%] text-left">Nghề Nghiệp</th>
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
                        <button className="bg-[#2CC168] rounded-full p-2 m-1 text-white" onClick={()=>{setShowAddUserModal(true)}}>
                            <PlusCircleIcon className="w-6 h-6 text-white inline-block"></PlusCircleIcon>Thêm người dùng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default User