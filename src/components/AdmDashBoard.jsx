import { QuestionMarkCircleIcon, CheckCircleIcon, ForwardIcon, ClockIcon } from '@heroicons/react/24/solid'

const AdmDashBoard = ({ all, replied, wait, foward }) => {
    return (
        <div className="p-12">
            <h1 className="font-bold text-3xl mb-5 font-sans">DASHBOARD</h1>
            <div className="bg-gray-300 mx-auto rounded-3xl flex">
                <div className="w-[25%] border-r-2 border-white flex flex-col items-center p-5">
                    <QuestionMarkCircleIcon className='h-[100px] w-[100px] text-blue-300'></QuestionMarkCircleIcon>
                    <h1 className='font-bold text-3xl font-sans text-black'>{all}</h1>
                    <p className='font-light text-gray-700'>Tổng câu hỏi</p>
                </div>
                <div className="w-[25%] border-r-2 border-white flex flex-col items-center p-5 ">
                    <CheckCircleIcon className='h-[100px] w-[100px] text-green-300'></CheckCircleIcon>
                    <h1 className='font-bold text-3xl font-sans text-black'>{replied}</h1>
                    <p className='font-light text-gray-700'>Đã trả lời</p>
                </div>
                <div className="w-[25%] border-r-2 border-white flex flex-col items-center p-5 ">
                    <ClockIcon className='h-[100px] w-[100px] text-red-300'></ClockIcon>
                    <h1 className='font-bold text-3xl font-sans text-black'>{wait}</h1>
                    <p className='font-light text-gray-700'>Chờ trả lời</p>
                </div>
                <div className="w-[25%] border-r-2 border-white flex flex-col items-center p-5 ">
                    <ForwardIcon className='h-[100px] w-[100px] text-orange-300'></ForwardIcon>

                    <h1 className='font-bold text-3xl font-sans text-black'>{foward}</h1>
                    <p className='font-light text-gray-700'>Chuyển tiếp</p>
                </div>
            </div>
        </div>
    )
}

export default AdmDashBoard