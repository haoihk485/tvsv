import { getCookie } from "../cookie";

export const getAllDepCounsellor = (page, sortType, searchKey) => {
    const sortOption = sortType === 'asc' ? '&sort=name,asc' : '&sort=name,desc'
    const searchOption = searchKey === '' ? '' : `&value=${searchKey}`
    const url = `https://student-consulting.onrender.com/api/department-head/users?size=5&page=${page}${sortOption}${searchOption}`
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        }
    };
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export const AddDepCounsellor = (name, email, phone, password) => {
    const url = 'https://student-consulting.onrender.com/api/department-head/users'
    const data = {
        name,
        email,
        phone,
        password,
        occupation: "Tư vấn viên",
        role: "counsellor"
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`
        },
        body: JSON.stringify(data)
    };
    return fetch(url, options)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function updateConsellorStatus(id) {
    const url = `https://student-consulting.onrender.com/api/department-head/users/${id}`
    const options = {
        method: "PATCH",
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
