import axios from "axios"
import { getCookie } from "./cookie"
import { info } from "autoprefixer"


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
    const option = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`,
        },
    }
    const url = 'https://student-consulting.onrender.com/api/auth/refresh-token'
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
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

export function getDeparments(page, search) {
    const token = getCookie('accessToken')
    const searchKey = search ? `value=${search}&` : ''
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const url = `https://student-consulting.onrender.com/api/departments?${searchKey}size=3&page=${page}`
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

