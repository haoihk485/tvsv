import axios from "axios"
import { getCookie } from "./cookie"
import { info } from "autoprefixer"
import {isAccessTokenAlive} from "./jwt"


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
export function refreshToken() {
    if(isAccessTokenAlive(getCookie('accessToken'))) return
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
            console.log(info)
            console.log(document.cookie)
            document.cookie = `accessToken=${info.data.token}`
            document.cookie = `fullName=${info.data.name}`
            document.cookie = `role=${info.data.role}`
            console.log(document.cookie)
        })
        .catch(error => console.log(error))
}

export function addDepartment(name, description, token) {
    console.log(token)
    const data = {
        name,
        description
    }
    console.log(data);
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }
    const url = 'https://student-consulting.onrender.com/api/admin/departments'
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function getDeparments(page, sortBy='name', sortType='asc', search='', status = 'all') {
    const searchKey = search!==''? `value=${search}&` : ''
    const sortOption = `&sort=${sortBy},${sortType}`
    const statusOption = `&status=${status}`
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const url = `https://student-consulting.onrender.com/api/departments?${searchKey}size=3&page=${page}${sortOption}${statusOption}`
    console.log(url);
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function getDeparmentDetailById(id) {
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const url = `https://student-consulting.onrender.com/api/departments/${id}`
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function uploadImage(formData, id){
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

export function uploadImageAxios (formData, id, config){
    try {
        const url = `https://student-consulting.onrender.com/uploads/images/${id}`;
        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': `Bearer ${getCookie('accessToken')}`
            },}
        return axios.post(url, formData, config)
    } catch (error) {
        console.log(error.message)
    }
}

export function updateDepartment (id, name, description){
    const data = {
        name, description
    }
    const options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        }
    };
    const uri = `https://student-consulting.onrender.com/api/admin/departments/${id}`
    return fetch(uri, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function updateDepartmentStatus (id){
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        }
    };
    const url = `https://student-consulting.onrender.com/api/admin/departments/${id}`

    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

