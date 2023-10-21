const Alert = ({id, children}) => {
    return (
        <p id = {id} className="text-xs text-red-500 min-h-[12px] pl-2 my-1">{children}</p>
    )
}

export default Alert