import logo from '../assets/img/logo.png'
const Footer = () => {
    return (
        <div className="w-full min-h-[200px] bg-black text-white p-8 flex items-center">
            <img src={logo} alt="" className='w-[100px] h-full' />
            <div className='ml-5'>
                <h1 className="font-bold text-sm">Nhóm Tiểu Luận 1</h1>
                <p className="text-xs">Giáo viên hướng dẫn: </p>
                <p className="text-xs">Nguyễn Hữu Trung </p>
            </div>
        </div>
    )
}
export default Footer