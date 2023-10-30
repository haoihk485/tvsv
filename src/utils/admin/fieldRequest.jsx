import { getCookie } from "../cookie"

export function getAllField(page, sortBy = 'name', sortType = 'asc', search= '') {
    const searchKey = search!==''? `value=${search}` : ''
    const sortOption = `&sort=${sortBy},${sortType}`

    const url = `https://student-consulting.onrender.com/api/fields?${searchKey}&size=3&page=${page}${sortOption}`
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function addField(name) {
    const data = { name }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
        body: JSON.stringify(data)
    }
    const url = 'https://student-consulting.onrender.com/api/admin/fields'
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function getFieldById(id) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }
    const url = `https://student-consulting.onrender.com/api/fields/${id}`
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function updateField(id, name) {
    const data = {
        name
    }
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
        body: JSON.stringify(data)
    }
    const url = `https://student-consulting.onrender.com/api/admin/fields/${id}`

    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function deleteField(id){
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
    }
    const url = `https://student-consulting.onrender.com/api/admin/fields/${id}`

    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}