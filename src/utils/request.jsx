import axios from "axios"
import { deleteAllCookies, getCookie } from "./cookie"
import { isAccessTokenAlive } from "./jwt"
import { useNavigate } from "react-router-dom"


export function register(fullName, email, phone, password, occupation) {
    const url = 'https://student-consulting.onrender.com/api/auth/register'
    const data = {
        name: fullName,
        email,
        phone,
        password,
        occupation
    }
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}


export function login(phone, password) {
    const data = {
        "username": phone,
        password
    }
    const option = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    const url = 'https://student-consulting.onrender.com/api/auth/login'
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function logout() {
    const option = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    }
    const url = 'https://student-consulting.onrender.com/api/auth/logout'
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}
export async function refreshToken() {
    if (isAccessTokenAlive(getCookie('accessToken'))) return
    const option = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    }
    const url = 'https://student-consulting.onrender.com/api/auth/refresh-token'
    return fetch(url, option)
        .then(response => response.json())
        .then(info => {
            console.log(info);
            if (info.success) {
                document.cookie = `accessToken=${info.data.token}`
                document.cookie = `fullName=${info.data.name}`
                document.cookie = `role=${info.data.role}`
            }
            else {
                alert(info.message)
                deleteAllCookies()
            }
            return
        })
        .catch(error => {
            alert('Phiên đăng nhập hết hạn')
            deleteAllCookies()
            console.log()
        })
}



export function uploadImage(formData, id) {
    const options = {
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
    };
    const url = `https://student-consulting.onrender.com/uploads/images/${id}`;
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function uploadImageAxios(formData, id, config) {
    try {
        const url = `https://student-consulting.onrender.com/uploads/images/${id}`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${getCookie('accessToken')}`
            },
        }
        return axios.post(url, formData, config)
    } catch (error) {
        console.log(error.message)
    }
}


