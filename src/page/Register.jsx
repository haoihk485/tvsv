import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'

import sideImage from '../assets/img/schoolView.png'
import logo from '../assets/img/logo.png'
import MyInput from '../components/MyInPut'
import SelectBox from '../components/SelectBox'
import Alert from '../components/Alert'
import background from "../assets/img/background.png"


import * as request from "../utils/request.jsx"

const Register = () => {
    const [occupation, setOccupation] = useState('Sinh Viên')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const data = [
        { name: 'Sinh Viên' },
        { name: 'Phụ Huynh' },
        { name: 'Cựu Sinh Viên' }
    ]

    const handleSelect = (newValue) => {
        setOccupation(newValue)
    }

    const handleRegister = async () => {
        if (isLoading) { return; }
        setIsLoading(true)

        try {
            console.log('is register')
            if (!isValid()) {
                nameBlurHandle()
                phoneBlurHandle()
                emaildBlurHandle()
                passwordBlurHandle()
                rePasswordBlurHandle()
                return
            } else {
                const response = await request.register(`${firstName} ${lastName}`, email, phone, password, occupation)
                console.log(response)
                if (response.success) {
                    alert("Đăng ký thành công")
                    navigate('/login')
                } else {
                    alert(response.message)
                }
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }


    }

    const nameBlurHandle = () => {
        const element = document.getElementById('fullNameAlert')
        element.innerHTML = firstName === "" ? "Please enter your first name" : lastName === "" ? "Please enter your last name" : ""
    }

    const phoneBlurHandle = () => {
        const element = document.getElementById('phoneAlert')
        element.innerHTML = phone === "" ? "Please enter your number" : validator.isMobilePhone(phone) ? "" : "Your phone number is not valid"
    }

    const emaildBlurHandle = () => {
        const element = document.getElementById('emailAlert')
        element.innerHTML = email === "" ? "Please enter your email" : validator.isEmail(email) ? "" : "Your email is not valid"
    }

    const passwordBlurHandle = () => {

        const element = document.getElementById('passwordAlert')
        element.innerHTML = password !== "" ? "" : "Please enter your password"
    }

    const rePasswordBlurHandle = () => {
        const element = document.getElementById('rePasswordAlert')
        element.innerHTML = rePassword === "" ? "Please re-enter your password" : password === rePassword ? "" : "Your password and repassword not match"
    }

    const isValid = () => {
        if (firstName === "" || lastName === "" || phone === "" || !validator.isMobilePhone(phone) || email === "" || !validator.isEmail(email) || password === "" || password !== rePassword) {
            return false
        }
        return true
    }



    return (
        <section className={`bg-[url('https://wallpaper.dog/large/942516.jpg')] bg-cover min-h-screen flex items-center justify-center`}>
            <div className="bg-gray-300 flex rounded-2xl shadow-lg max-w-2xl md:max-w-4xl ">
                <div className="md:w-1/2 px-8 md:px-16">
                    <img src={logo} alt="" className="h-[100px] mx-auto mt-10 m-3   " />
                    <h2 className="font-bold text-3xl text-[#2E3192] mb-6 text-center">Register</h2>
                    <div className="flex flex-col ">
                        <div className='flex flex-row justify-between'>
                            <input className="p-2 mt-4 rounded-xl border outline-gray-500 w-[48%]"
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onBlur={nameBlurHandle}
                                onChange={(e) => { setFirstName(e.target.value) }} />
                            <input className="p-2 mt-4 rounded-xl border outline-gray-500 w-[48%]"
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onBlur={nameBlurHandle}
                                onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <Alert id='fullNameAlert'></Alert>
                        <div className='flex flex-row w-full justify-between'>
                            <p className=' text-gray-800 self-center'>You're: </p>
                            <SelectBox data={data} eleClick={handleSelect}>{occupation}</SelectBox>
                        </div>
                        <Alert id=''></Alert>
                        <MyInput t="tel" n="phone" p="Phone Number" v={phone} oC={(e) => setPhone(e.target.value)} oB={phoneBlurHandle}></MyInput>
                        <Alert id='phoneAlert'></Alert>
                        <MyInput t="email" n="email" p="Email" v={email} oC={(e) => setEmail(e.target.value)} oB={emaildBlurHandle}></MyInput>
                        <Alert id='emailAlert'></Alert>
                        <MyInput t="password" n="password" p="Password" v={password} oC={(e) => { setRePassword(''); setPassword(e.target.value) }} oB={passwordBlurHandle}></MyInput>
                        <Alert id='passwordAlert'></Alert>
                        <MyInput t="password" n="rePassword" p="Confirm Password" v={rePassword} oC={(e) => setRePassword(e.target.value)} oB={rePasswordBlurHandle}></MyInput>
                        <Alert id='rePasswordAlert'></Alert>
                        <button className="rounded-2xl text-white py-2 bg-red-600 mt-5 hover:bg-red-400"
                            onClick={handleRegister}>Register</button>
                    </div>
                    <div className='inline-block'>
                        <p className=" text-xs my-6 cursor-pointer hover:opacity-50" onClick={() => navigate('/login')}>Already have an account?</p>
                    </div>
                </div>
                <div className="w-1/2 pr-5 py-5 md:block hidden ">
                    <img src={sideImage} alt="" className=" rounded-2xl min-h-full" />
                </div>
            </div>
        </section>
    )
}
export default Register