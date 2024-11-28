import React, { useState } from 'react'
import "./forgetPassword.css"
import "../Login/login.css"
import { NavLink, useNavigate } from 'react-router-dom'
import apis from '../../utils/api'
import toast from 'react-hot-toast'

const ForgetPassword = () => {

  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState({
    email: '',
  })

  const handleEmail = (e) => {
    setEmailInput({
      ...emailInput,
      [e.target.name]: e.target.value,
    })
  }

  const handleBackToLogin = () => {
    navigate("/login")
  }

  const handleSendOtp = async (e) => {

    e.preventDefault();

    const { email } = emailInput;

    try {
      const response = await fetch(apis().forgetPassword, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" }
      })

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message)
      }

      if (result?.status) {
        toast.success(result?.message);
        localStorage.setItem("passToken", result?.token)
        localStorage.setItem("email", email);
        navigate("/verifyOtp")
      }

    } catch (error) {
      toast.error(error.message)
    }

    setEmailInput({
      email: '',
    })
  }

  return (
    <>
      {/* login left side */}
      <div className="container-fluid">
        <div className="row ">
          {/* left side */}
          <div className=" col-12 col-md-6 col-lg-6  left-side-main">
            <div className="left-side">
              <div className='mb-5'>
                <img src='/Images/LogoMain.png' className='left-side-logo img-fluid' />
              </div>

              <div className='right-main-img mt-5'>
                <img src='/Images/reset_password_image.png' className='img-fluid main-img' />
              </div>
            </div>
          </div>
          {/* right side start */}
          <div className="col-12 col-md-6 col-lg-6 right-side-main">
            <div className="right-side-content">
              <form onSubmit={handleSendOtp}>
                <div className="container login_form " >

                  <div className="row px-3 pt-5 pb-1">
                    <div className="col-12">
                      <h3 className='forget_password_heading'>Forget Password</h3>
                    </div>
                  </div>

                  <div className="row px-3  pb-1">
                    <div className="col-12">
                      <p className='forget_password_para'>Enter a email and we'll send a otp to reset your Password</p>
                    </div>
                  </div>

                  <div className="row px-3 py-1">
                    <div className="col-12">
                      <label htmlFor='email'>Email <span className='star-color'>*</span></label>
                      <input type='email' value={emailInput.email} onChange={handleEmail} name='email' placeholder='Enter Your Email' autoComplete='off' className='input-field' required />
                    </div>
                  </div>





                  <div className="row  px-3  ">
                    <div className="col-12 otpBtn">
                      <button type='submit' onClick={handleSendOtp} className='getOtpBtn'>Get OTP</button>
                    </div>
                  </div>

                  <div className="row mt-3 ">
                    <div className="col-12">
                      <p className='text-danger text-center back_to_login' onClick={handleBackToLogin}>Back to Login</p>
                    </div>
                  </div>



                </div>
              </form>
            </div>
          </div>




          {/* Right side end */}
        </div>
      </div>
    </>
  )
}

export default ForgetPassword