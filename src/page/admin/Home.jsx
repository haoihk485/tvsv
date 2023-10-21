import AdmDashBoard from '../../components/AdmDashBoard'

import AdminNav from "../../components/AdminNav"
import { getCookie } from "../../utils/cookie.jsx"

const AdminHome = () => {

    return (
        <div>
            <AdminNav avatarUrl={ getCookie('avatarUrl')}></AdminNav>
            <AdmDashBoard all={120} replied={80} wait={20} foward={20}></AdmDashBoard>
        </div>
    )
}
export default AdminHome