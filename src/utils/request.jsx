import axios from "axios"
import { getCookie } from "./cookie"

// export async function register(fullName, email, phone, password, occupation) {
//     const data = {
//         fullName,
//         email,
//         phone,
//         password,
//         occupation
//     }
//     const option = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     }
//     const respond = await fetch('https://student-consulting.onrender.com/api/auth/register', option)
//     return respond.json()
// }


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


// export async function login(phone, password) {
//     const data = {
//         "userName": phone,
//         password
//     }
//     console.log(data)
//     const option = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     }
//     const respond = await fetch('https://student-consulting.onrender.com/api/auth/login', option)
//     return respond.json()
// }
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

// export async function logout() {
//     const data = {}
//     const option = {
//         method: "POST",
//         mode: 'no-cors',
//         credentials: 'include',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     }
//     const respond = await fetch('https://student-consulting.onrender.com/api/auth/logout', option)
//     return respond.json()
// }
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
export function refreshToken () {
    const option = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            'Authorization':`${getCookie('accessToken')}`,
        },
    }
    const url = 'https://student-consulting.onrender.com/api/auth/refresh-token'
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

export function addDepartment (name, description, token) {
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
            'Authorization': `${token}`
        },
        body: JSON.stringify(data)
    }
    const url = 'https://student-consulting.onrender.com/api/admin/departments'
    return fetch(url, option)
        .then(response => response.json())
        .then(info => info)
        .catch(error => console.log(error))
}

// export const addDepHandle = async () => {
//     // if (isLoading) { return; }
//     setIsLoading(true);
//     try {
//         if (depName !== '') {
//             const response = await addDepartment(depName, desc, accessToken);
//             if (response.data.success === true) { // Điều này phụ thuộc vào cấu trúc của đối tượng phản hồi Axios.
//                 alert(response.data.message); // Điều này phụ thuộc vào cấu trúc của đối tượng phản hồi Axios.
//                 setDepName('');
//                 setDesc('');
//             }
//         }
//     } catch (error) {
//         console.error(error); // Xử lý lỗi
//     }
// }