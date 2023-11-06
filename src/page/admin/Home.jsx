import AdmDashBoard from '../../ui/admin/AdmDashBoard'
import AdminNav from "../../ui/admin/AdminNav"
import { getCookie } from "../../utils/cookie.jsx"
import blankAvt from "../../assets/img/blankAvt.png"
import { forward } from '../../utils/route'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {
    return (
        <div>
            <AdmDashBoard all={120} replied={80} wait={20} foward={20}></AdmDashBoard>
        </div>
    )
}
export default AdminHome