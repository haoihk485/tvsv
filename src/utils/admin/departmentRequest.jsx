import { getCookie } from "../cookie";

export function updateDepartment(id, name, description) {
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

export function updateDepartmentStatus(id) {
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

export function addDepartment(name, description) {
    const data = {
        name,
        description
    }
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`,
        },
        body: JSON.stringify(data)
    }
    const url = 'https://student-consulting.onrender.com/api/admin/departments'
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function getDeparments(page, sortBy = 'name', sortType = 'asc', search = '', status = 'all', size = 5) {
    const searchKey = search !== '' ? `value=${search}&` : ''
    const sortOption = `&sort=${sortBy},${sortType}`
    const statusOption = `&status=${status}`
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const url = `https://student-consulting.onrender.com/api/departments?${searchKey}size=${size}&page=${page}${sortOption}${statusOption}`
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
            "Content-Type": "application/json",

        }
    }
    const url = `https://student-consulting.onrender.com/api/departments/${id}`
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function updateDepartmentHead(userId, departmentHeadId) {
    const option = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getCookie('accessToken')}`,
        }
    }
    const url = `https://student-consulting.onrender.com/api/admin/department-head/users/${userId}/departments/${departmentHeadId}`
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function getActiveDepartments() {
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const url = 'https://student-consulting.onrender.com/api/departments/all'
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}