import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PencilIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/solid'

import Navigation from "../components/Navigation"
import Footer from '../components/Footer'
import QuestionBox from '../components/QuestionBox'
import TextEditorModal from '../components/modal/TextEditorModal'
import { getCookie } from '../utils/cookie.jsx'


const Home = () => {
    const navigate = useNavigate()
    const accessToken = getCookie('accessToken')
    const avatarUrl = getCookie('avatarUrl')
    const [showTextEditorModal, setShowTextEditorModal] = useState(false)
    const isLogin = accessToken ? true : false
    const doSomeThing = () => {
        if (isLogin) {
            setShowTextEditorModal(true)
        } else {
            navigate('/login')
        }
    }

    return (
        <div className='bg-[#E9ECEF] min-h-screen'>
            <TextEditorModal show={showTextEditorModal} cb={()=>{setShowTextEditorModal(false)}}></TextEditorModal>
            <Navigation></Navigation>
            <div className="bg-black p-16 flex justify-between">
                <div>
                    <h1 className="text-white text-3xl font-bold">Hỏi đáp</h1>
                    <p className="text-white ">Thắc mắc của bạn về UTE</p>
                </div>
                <div className="bg-blue-700 rounded-3xl text-white max-h-12 p-3 hover:bg-blue-500 cursor-pointer" onClick={doSomeThing}>
                    <PencilIcon className='h-4 w-4 inline-block mr-1'></PencilIcon>
                    <p className='inline-block mr-1'>{isLogin ? "Đặt câu hỏi" : "Đăng nhập"}</p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-[20%] p-2'>
                    <ul className='bg-white border rounded-lg overflow-hidden'>
                        <li className='font-bold border-b-2 p-1 text-lg text-center text-white bg-blue-700'>Câu hỏi theo khoa</li>
                        <li className='border-b text-sm p-3 hover:bg-gray-500 hover:text-white cursor-pointer'>Công nghệ thông tin</li>
                        <li className='border-b text-sm p-3 hover:bg-gray-500 hover:text-white cursor-pointer'>Công nghệ thông tin</li>
                        <li className='border-b text-sm p-3 hover:bg-gray-500 hover:text-white cursor-pointer'>Công nghệ thông tin</li>
                        <li className='border-b text-sm p-3 hover:bg-gray-500 hover:text-white cursor-pointer'>Công nghệ thông tin</li>
                        <li className='border-b text-sm p-3 hover:bg-gray-500 hover:text-white cursor-pointer'>Công nghệ thông tin</li>
                        <li className='border-b text-sm p-3 hover:bg-gray-500 hover:text-white cursor-pointer'>Công nghệ thông tin</li>
                        <li className='border-b text-sm p-3 hover:bg-gray-500 hover:text-white cursor-pointer'>Công nghệ thông tin</li>
                        <li className='border-b text-sm p-3 hover:bg-gray-500 hover:text-white cursor-pointer'>Công nghệ thông tin</li>
                        <li className='border-b text-sm p-3 hover:bg-gray-500 hover:text-white cursor-pointer'>Công nghệ thông tin</li>
                        <li className='border-b text-sm p-3 hover:bg-gray-500 hover:text-white cursor-pointer'>Công nghệ thông tin</li>
                    </ul>
                </div>
                <div className={`'w-[60%]'`}>
                    <div className='my-2 bg-white mx-auto text-base p-2 rounded-lg text-[#6C7592] font-medium'>
                        <div className='h-full flex items-center'><QuestionMarkCircleIcon className='h-4 w-4 inline-block mr-1 my-auto'></QuestionMarkCircleIcon>Hỏi đáp</div>
                    </div>
                    <div className={`bg-white mx-auto rounded-lg text-[#6C7592] p-5 flex border border-blue-700  ${isLogin?"":"hidden"}`}>
                        <div className=''>
                            <img src={avatarUrl} alt="" className='h-[75px] w-[75px] min-w-[75px] rounded-full border-[2px] border-yellow-400 p-1' />
                        </div>
                        <div className='ml-3 my-auto w-full'>
                            <h1 className=' font-bold'>userName</h1>
                            <button className='w-full my-3 border-2 min-h-[40px] rounded-lg hover:bg-blue-500 hover:text-white'>Tạo câu hỏi của bạn</button>
                        </div>
                    </div>
                    <div className='my-2 bg-white mx-auto text-base p-2 rounded-lg text-[#6C7592] font-medium'>
                        <QuestionBox author='user name' title='Tiêu Đề'
                            content='Những câu đố vui, câu đố hài hước, đố mẹo cực hay nhưng không kém phần hại não, trí tuệ sẽ giúp các bạn kích thích trí não hoạt động nhanh nhạy, đồng thời có những phút giải trí xua tan đi những căng thẳng, mệt mỏi'
                            answer='3'></QuestionBox>
                        <QuestionBox author='user name' title='Tiêu Đề'
                            content='Những câu đố vui, câu đố hài hước, đố mẹo cực hay nhưng không kém phần hại não, trí tuệ sẽ giúp các bạn kích thích trí não hoạt động nhanh nhạy, đồng thời có những phút giải trí xua tan đi những căng thẳng, mệt mỏi'
                            answer='3'></QuestionBox>
                        <QuestionBox author='user name' title='Tiêu Đề'
                            content='Những câu đố vui, câu đố hài hước, đố mẹo cực hay nhưng không kém phần hại não, trí tuệ sẽ giúp các bạn kích thích trí não hoạt động nhanh nhạy, đồng thời có những phút giải trí xua tan đi những căng thẳng, mệt mỏi'
                            answer='3'></QuestionBox>
                        <QuestionBox author='user name' title='Tiêu Đề'
                            content='Những câu đố vui, câu đố hài hước, đố mẹo cực hay nhưng không kém phần hại não, trí tuệ sẽ giúp các bạn kích thích trí não hoạt động nhanh nhạy, đồng thời có những phút giải trí xua tan đi những căng thẳng, mệt mỏi'
                            answer='3'></QuestionBox>
                        <QuestionBox author='user name' title='Tiêu Đề'
                            content='Những câu đố vui, câu đố hài hước, đố mẹo cực hay nhưng không kém phần hại não, trí tuệ sẽ giúp các bạn kích thích trí não hoạt động nhanh nhạy, đồng thời có những phút giải trí xua tan đi những căng thẳng, mệt mỏi'
                            answer='3'></QuestionBox>
                        <QuestionBox author='user name' title='Tiêu Đề'
                            content='Những câu đố vui, câu đố hài hước, đố mẹo cực hay nhưng không kém phần hại não, trí tuệ sẽ giúp các bạn kích thích trí não hoạt động nhanh nhạy, đồng thời có những phút giải trí xua tan đi những căng thẳng, mệt mỏi'
                            answer='3'></QuestionBox>
                        <QuestionBox author='user name' title='Tiêu Đề'
                            content='Những câu đố vui, câu đố hài hước, đố mẹo cực hay nhưng không kém phần hại não, trí tuệ sẽ giúp các bạn kích thích trí não hoạt động nhanh nhạy, đồng thời có những phút giải trí xua tan đi những căng thẳng, mệt mỏi'
                            answer='3'></QuestionBox>
                        <QuestionBox author='user name' title='Tiêu Đề'
                            content='Những câu đố vui, câu đố hài hước, đố mẹo cực hay nhưng không kém phần hại não, trí tuệ sẽ giúp các bạn kích thích trí não hoạt động nhanh nhạy, đồng thời có những phút giải trí xua tan đi những căng thẳng, mệt mỏi'
                            answer='3'></QuestionBox>
                        <div className='w-full flex justify-center'>
                            <button className='bg-blue-500 p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-blue-300'>prev</button>
                            <button className='bg-blue-500 p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-blue-300'>1</button>
                            <button className='bg-blue-500 p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-blue-300'>2</button>
                            <button className='bg-blue-500 p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-blue-300'>3</button>
                            <button className='bg-blue-500 p-1 text-white rounded-full min-w-[30px] ml-2 mb-3 hover:bg-blue-300'>next</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home