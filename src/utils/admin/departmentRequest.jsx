import { getCookie } from "../cookie";

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

export function addDepartment(name, description, token) {
    const data = {
        name,
        description
    }
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