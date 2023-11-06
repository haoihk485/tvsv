import { getCookie } from "../cookie"

export function getAllUser(page, searchKey = '', occupation = '', role = '', status = '', sort = {}) {
    const occupationOption = occupation === '' ? '&occupation=all' : `&occupation=${occupation}`
    const roleOption = role === '' ? '&role=all' : `&role=${role}`
    const statusOption = status === '' ? '&status=all' : `&status=${status}`
    const searchOption = searchKey === '' ? '' : `&value=${searchKey}`
    const sortOption = !sort ? '' : sort.map((option) => {
        return `&sort=${option.by},${option.type}`
    }).join('')
    console.log(sortOption);
    const url = `https://student-consulting.onrender.com/api/admin/users?size=5&page=${page}${searchOption}${occupationOption}${roleOption}${statusOption}${sortOption}${sortOption}`
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        }
    }
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function updateUserStatus(id) {
    const url = `https://student-consulting.onrender.com/api/admin/users/${id}`
    console.log(url);
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        }
    }
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))

}

export function addUser(name, email, phone, password, role) {
    const url = 'https://student-consulting.onrender.com/api/admin/users'
    const data = {
        name,
        email,
        phone,
        password,
        "occupation": "",
        role
    }
    console.log(data);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
        body: JSON.stringify(data)
    }
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))

}

export function getUserWithoutDep(page, searchKey, size = 10) {
    const searchOption = searchKey === '' ? '' : `&value=${searchKey}`
    const url = `https://student-consulting.onrender.com/api/admin/users/department-is-null?page=${page}&size=${size}${searchOption}`
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
    }
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function updateUserDepartment(userId, depId) {
    const url = `https://student-consulting.onrender.com/api/admin/users/${userId}/departments/${depId}`
    console.log(url);
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
    }
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function getUserByDepartment(depId, page, size = 5) {
    const url = `https://student-consulting.onrender.com/api/admin/users/departments/${depId}?size=${size}&page=${page}`
    console.log(url);
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
    }
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}