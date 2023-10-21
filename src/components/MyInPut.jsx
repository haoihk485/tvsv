const MyInput = ({t, n, p, v, oC, oB}) => {
    return (
        <input className="p-2 rounded-xl border outline-red-50" type={t} name={n} placeholder={p} value={v} onChange={oC} onBlur={oB}/>
    )
}

export default MyInput