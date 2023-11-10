import { getCookie } from "../cookie";

export function getAllDep() {
    const url = 'https://student-consulting.onrender.com/api/departments/all'
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

export function getDepField(id) {
    const url = `https://student-consulting.onrender.com/api/fields/departments/${id}`
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

export function createQuestion(departmentId, fieldId, title, content) {
    const url = `https://student-consulting.onrender.com/api/users/questions`
    const data = {
        departmentId, fieldId, title, content
    }
    alert(JSON.stringify(data));
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