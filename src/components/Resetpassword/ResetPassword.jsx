import React, { useState } from 'react'
import "../Login/login.css"
import "./resetPassword.css"
import { useNavigate } from 'react-router-dom'
import apis from '../../utils/api'
import toast from 'react-hot-toast'

const ResetPassword = () => {

  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  })

  const navigate = useNavigate();

  const handleInputpassword = (e) => {
    setPasswordInput({
      ...passwordInput,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = passwordInput;

    try {
      const response = await fetch(apis().updatePassword, {
        method: 'POST',
        body: JSON.stringify({ password, confirmPassword, token: localStorage.getItem("passToken") }),
        headers: { "Content-Type": "application/json" }

      })

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message)
      }

      if (result?.status) {
        toast.success(result?.message)
        navigate("/login")
        localStorage.removeItem("email")
        localStorage.removeItem("passToken")
      }

    } catch (error) {
      toast.error(error.message)
    }

    setPasswordInput({
      password: "",
      confirmPassword: "",
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
                <img src='/Images/Registration-img3.png' className='img-fluid main-img' />
              </div>
            </div>
          </div>
          {/* right side start */}
          <div className="col-12 col-md-6 col-lg-6 right-side-main">
            <div className="right-side-content">
              <form onSubmit={handlePasswordSubmit}>
                <div className="container login_form">

                  <div className="row px-3 pt-5 pb-1">
                    <div className="col-12">
                      <h3 className='login_heading'>Reset Password</h3>
                    </div>
                  </div>

                  <div className="row px-3 py-2">
                    <div className="col-12">
                      <label htmlFor='password'>New Password <span className='star-color'>*</span></label>
                      <input
                        type='text'
                        name='password'
                        placeholder='Enter New Password' autoComplete='off'
                        id='password'
                        value={passwordInput.password}
                        onChange={handleInputpassword}
                        className='input-field'
                        required />
                    </div>
                  </div>

                  <div className="row px-3 py-2">
                    <div className="col-12">
                      <label htmlFor='confirmPassword'>Confirm Password <span className='star-color'>*</span></label>
                      <input
                        type='text'
                        name='confirmPassword'
                        id='confirmPassword'
                        value={passwordInput.confirmPassword}
                        onChange={handleInputpassword}
                        placeholder='Enter Your Password' autoComplete='off' className='input-field'
                        required />
                    </div>
                  </div>



                  <div className="row  px-3 pt-4 pb-4 mx-0">
                    <div className="col-12 loginBtn">
                      <button type='submit' className='loginBtn' onClick={handlePasswordSubmit} >Reset Password</button>
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

export default ResetPassword