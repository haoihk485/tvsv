import { getCookie } from "../cookie";

export function getAllDepField(page) {
    const url = `https://student-consulting.onrender.com/api/departments/fields/my?page=${page}&size=5`
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
    };
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function getFieldDepNotHave() {
    const url = 'https://student-consulting.onrender.com/api/department-head/departments/fields'
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
    };
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function addDepField (ids) {
    if(!Array.isArray(ids)) return
    const url = 'https://student-consulting.onrender.com/api/department-head/fields'
    const data = {
        ids
    }
    console.log(JSON.stringify(data));
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
        body : JSON.stringify(data)
    };
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function deleteDepField (id){
    const url = `https://student-consulting.onrender.com/api/department-head/fields/${id}`
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
    };
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}