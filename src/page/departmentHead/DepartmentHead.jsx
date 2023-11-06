import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import blankAvt from '../../assets/img/blankAvt.png'
import AdminNav from '../../ui/admin/AdminNav';

const DepartmentHead = () => {

    const navigate = useNavigate()
    const userRole = getCookie('role');
    const avatarUrl = getCookie('avatarUrl')
    const role = 'ROLE_DEPARTMENT_HEAD'

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

export default DepartmentHead