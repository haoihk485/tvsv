import { useNavigate } from "react-router-dom"
import { getCookie } from "./cookie"

const navigate = useNavigate()

export function foward(role){
    if(role === getCookie('role')){
        return
    }
    else if(role === 'ROLE_USER'){
        navigate('/')
    }
    else if(role === 'ROLE_ADMIN'){
        navigate('/admin')
    }
    else if(role === 'ROLE_SUPERVISOR'){}
    else if(role === 'ROLE_COUNSELLOR'){}
    else if(role === 'ROLE_DEPARTMENT_HEAD'){}
}







