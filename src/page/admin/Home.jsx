import AdmDashBoard from '../../components/AdmDashBoard'

import AdminNav from "../../components/AdminNav"
import { getCookie } from "../../utils/cookie.jsx"
import blankAvt from "../../assets/img/blankAvt.png"
import { forward } from '../../utils/route'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {

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

    
    const avatarUrl = getCookie('avatarUrl')
    return (
        <div>
            <AdminNav avatarUrl={avatarUrl ? avatarUrl : blankAvt}></AdminNav>
            <AdmDashBoard all={120} replied={80} wait={20} foward={20}></AdmDashBoard>
        </div>
    )
}
export default AdminHome