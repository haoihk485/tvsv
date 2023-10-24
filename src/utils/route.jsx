import { useNavigate } from "react-router-dom";
import { getCookie } from "./cookie";


// Ánh xạ các vai trò sang các URL tương ứng


export function forward(role) {
    const navigate = useNavigate();
    if (getCookie('role') === null){
        navigate('/')
    }
    const roleToURL = {
        ROLE_USER: '/',
        ROLE_ADMIN: '/admin',
        ROLE_SUPERVISOR: '/supervisor',
        ROLE_COUNSELLOR: '/counsellor',
        ROLE_DEPARTMENT_HEAD: '/department-head',
    };
    const userRole = getCookie('role');
    // Kiểm tra nếu người dùng có vai trò hợp lệ
    if (roleToURL[role]) {
        if (role === userRole) {
            return;
        }
        navigate(roleToURL[role]);
    } else {
        console.error('Vai trò không hợp lệ:', role);
    }
}
