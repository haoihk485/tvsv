import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";


import AdminNav from "../../ui/admin/AdminNav"
import { getCookie } from "../../utils/cookie";
import blankAvt from "../../assets/img/blankAvt.png"

const Admin = () => {

    const navigate = useNavigate()
    const userRole = getCookie('role');
    const avatarUrl = getCookie('avatarUrl')
    const role = 'ROLE_ADMIN'

    useEffect(() => {
        if (!userRole) {
            return navigate('/')
        }
        const roleToURL = {
            ROLE_USER: '/',
            ROLE_ADMIN: '/admin/home',
            ROLE_SUPERVISOR: '/supervisor',
            ROLE_COUNSELLOR: '/counsellor',
            ROLE_DEPARTMENT_HEAD: '/department-head',
        };
        if (roleToURL[role]) {
            if (role === userRole) {
                navigate(roleToURL[role])
                return;
            }
            navigate(roleToURL[role]);
        } else {
            console.error('Vai trò không hợp lệ:');
        }
    }, [])

    return (
        <div>
            <AdminNav avatarUrl={avatarUrl ? avatarUrl : blankAvt}></AdminNav>
            <Outlet></Outlet>
        </div>
    )
}

export default Admin