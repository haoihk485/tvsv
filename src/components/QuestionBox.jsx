import { useEffect } from 'react'
import avt from '../assets/img/lebong.jpg'
import { BoltIcon } from '@heroicons/react/24/solid'



const QuestionBox = ({ author, title, content, answer }) => {

    useEffect(()=>{
        handleContentCreate()
    }, [])

    const handleContentCreate = () =>{
        console.log('work');
        const ele = document.getElementById('content')
        ele.innerHTML = content
    }

    return (
        <div className=''>
            <div className='flex mb-5 p-5'>
                <div className=''>
                    <img src={avt} alt="" className='h-[50px] w-[50px] min-w-[50px] rounded-full border-[2px] border-yellow-400 p-1' />
                </div>
                <div className='ml-3 my-auto w-full'>
                    <h1 className='font-bold'>{author}</h1>
                    <h1 className='mt-3 mb-1 text-sm'><i></i><BoltIcon className='w-4 h-4 text-blue-500 inline-block'></BoltIcon>{title}</h1>
                    <p className='mb-1 text-sm' id='content'></p>
                    <button className='font-bold text-blue-800 mt-1 mb-3'>Xem câu trả lời ({answer})</button>
                    <div className='flex'>
                        <div className=''>
                            <img src={avt} alt="" className='h-[40px] w-[40px] rounded-full min-w-[40px]' />
                        </div>
                        <div className='bg-gray-300 rounded-lg ml-2'>
                            <p className=' text-base m-2 font-semibold'>user name</p>
                            <p className='text-sm m-2 ' >adkoasodaopaopdosadijoasiojd</p>
                        </div>
                    </div>

                    <div className='border-b-2 flex mt-4'>
                        <div className=''>
                            <img src={avt} alt="" className='h-[40px] w-[40px] rounded-full min-w-[40px]' />
                        </div>
                        <div className='bg-gray-300 rounded-lg ml-2'>
                            <p className=' text-sm m-2 font-semibold'>user name</p>
                            <p className='text-sm m-2'>Lại lên bài 1 lần nữa sau lần xin phép đổi 1 chút lời từ bài “Người Được Chọn” thành “Người Anti Anh” thì nay em lại xin phép thay đổi 1 chút lời bài “Anh Luôn Như Vậy” thành “Em Không Như Vậy” 😅 Antifan chính hiệu của Anh. Vui Vẻ Không Quạo, Đừng Diss Em, chúng ta đã là những người Trưởng Thành 🤭</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionBox