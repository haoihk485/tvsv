
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import validator from "validator"



import MyInput from "../components/MyInPut"
import Alert from "../components/Alert";
import AlertMessage from "../components/AlertMessage"
import * as request from "../utils/request.jsx"
import avt from "../assets/img/blankAvt.png"
import sideImage from '../assets/img/schoolView.png'
import logo from '../assets/img/logo.png'



const Login = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [alertMessage, setAlertMessage] = useState([]);

    const navigate = useNavigate()


    useEffect(() => {
        const timer = setInterval(() => {
            if (alertMessage.length > 0) {
                removeAlertMessage(alertMessage[0]);
            }
        }, 2000);

        return () => {
            clearInterval(timer);
        };
    }, [alertMessage]);

    const addalertMessage = (type, message) => {
        const newAlertMessage = <AlertMessage type={type} message={message} />;
        setAlertMessage([newAlertMessage, ...alertMessage]);
    };

    const removeAlertMessage = (alertMessageToRemove) => {
        setAlertMessage(alertMessage.filter(message => message !== alertMessageToRemove))
    }

    const handleLogin = async () => {
        if (isLoading) { return; }
        setIsLoading(true)
        try {
            if (phone === "" || password === "" || !validator.isMobilePhone(phone)) {
                phoneBlurHandle()
                passwordBlurHandle()
                return
            }
            else {
                console.log('isLogin')
                const response = await request.login(phone, password)
                console.log(response)
                if (response.success) {
                    document.cookie = `accessToken=${response.data.token}`
                    document.cookie = `fullName=${response.data.name}`
                    document.cookie = `role=${response.data.role}`
                    if (response.data.avatar !== null)
                        document.cookie = `avatarUrl=${response.data.avatar}`
                    else
                        document.cookie = `avatarUrl=${avt}`
                    document.cookie = `role=${response.data.role}`
                    if (response.data.role === 'ROLE_ADMIN') {
                        navigate('/admin')
                    } else { navigate('/') }

                } else {
                    addalertMessage("error", "Check your info again!!")
                    console.log(request.message)
                }
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    const phoneBlurHandle = () => {
        const element = document.getElementById('phoneAlert')
        element.innerHTML = phone === "" ? "Please enter your number" : validator.isMobilePhone(phone) ? "" : "Your phone number is not valid"
    }

    const passwordBlurHandle = () => {
        const element = document.getElementById('passwordAlert')
        element.innerHTML = password !== "" ? "" : "Please enter your password"
    }

    return (
        <div>
            <div className="fixed right-8">
                {alertMessage.map((alert, i) => (
                    <div key={i}>{alert}</div>
                ))}
            </div>
            <section className={`bg-[url('https://wallpaper.dog/large/942516.jpg')] bg-cover min-h-screen flex items-center justify-center`}>
                <div className="bg-gray-300 flex rounded-2xl shadow-lg max-w-3xl ">
                    <div className="md:w-1/2 px-16">
                        <img src={logo} alt="" className="h-[100px] mx-auto mt-10 m-3" />
                        <h2 className="font-bold text-3xl text-[#2E3192] mb-6 text-center">Login</h2>
                        <div className="flex flex-col ">
                            <MyInput t="tel" n="phone" p="Phone Number" v={phone} oC={(e) => setPhone(e.target.value)} oB={phoneBlurHandle}></MyInput>
                            <Alert id='phoneAlert'></Alert>
                            <MyInput t="password" n="password" p="Password" v={password} oC={(e) => setPassword(e.target.value)} oB={passwordBlurHandle}></MyInput>
                            <Alert id='passwordAlert'></Alert>
                            <button className="rounded-2xl text-white py-2 bg-red-600 mt-5 hover:bg-red-400"
                                onClick={handleLogin}>Login</button>
                        </div>
                        <div className="mt-5 grid grid-cols-3 item-center text-gray-800">
                            <hr className="border-gray-800 my-auto" />
                            <p className="text-center">OR</p>
                            <hr className="border-gray-800 my-auto" />
                        </div>
                        <div>
                            <button className="rounded-2xl text-black py-2 bg-yellow-50 mt-5 hover:bg-white w-full" onClick={() => { navigate('/register') }}>Register</button>
                            <p className=" text-xs py-6 cursor-pointer hover:opacity-50">Forgot your password?</p>
                        </div>
                    </div>
                    <div className="w-1/2 pr-5 py-5 md:block hidden ">
                        <img src={sideImage} alt="" className=" rounded-2xl min-h-full" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login