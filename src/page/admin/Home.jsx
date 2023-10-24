import AdmDashBoard from '../../components/AdmDashBoard'

import AdminNav from "../../components/AdminNav"
import { getCookie } from "../../utils/cookie.jsx"
import blankAvt from "../../assets/img/blankAvt.png"
import { foward } from '../../utils/route'

const AdminHome = () => {
    foward('ROLE_ADMIN')
    const avatarUrl = getCookie('avatarUrl')

    return (
        <div>
            <AdminNav avatarUrl={avatarUrl ? avatarUrl : blankAvt}></AdminNav>
            <AdmDashBoard all={120} replied={80} wait={20} foward={20}></AdmDashBoard>
        </div>
    )
}
export default AdminHome