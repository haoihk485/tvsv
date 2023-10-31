const authorizeRoles = (role , ...roles) =>{
    return roles.includes(role)    
}

export default authorizeRoles