import React, { useState } from 'react'
import "./login.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import apis from '../../utils/api'
import toast from 'react-hot-toast'



const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate();

  const handleUserDataChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    try {
      const response = await fetch(apis().loginUser, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" }
      })

      const result = await response.json();

      console.log(response);
      console.log(result);

      if (!response.ok) {
        throw new Error(result?.message)
      }

      if (result?.status) {
        toast.success(result?.message)
        localStorage.setItem("accessToken", result?.token);
        navigate("/");
      }


    } catch (error) {
      toast.error(error.message)
    }

    setUser({
      email: "",
      password: "",
    })

  }

  // password icon
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  }


  return (
    <>
      {/* login left side */}
      <div className="container-fluid">
        <div className="row ">
          {/* left side */}
          <div className=" col-12 col-md-6   left-side-main ">
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





          <div className="col-12 col-md-6  right-side-main border">
            <div className="right-side-content">
              <form onSubmit={handleLoginSubmit}>
                <div className="container login_form">

                  <div className="row px-3 pt-5 pb-1">
                    <div className="col-12">
                      <h3 className='login_heading'>Login</h3>
                    </div>
                  </div>

                  <div className="row px-3 py-2">
                    <div className="col-12">
                      <label htmlFor='email'>Email <span className='star-color'>*</span></label>
                      <input type='email' name='email' value={user.email} onChange={handleUserDataChange} placeholder='Enter Your Email' autoComplete='off' className='input-field' required />
                    </div>
                  </div>

                  <div className="row px-3 py-2">
                    <div className="col-12">
                      <label htmlFor='password'>Password <span className='star-color'>*</span></label>
                      <div className='input-field-container' >
                        <input type={showPassword ? "text" : "password"} name='password' value={user.password} onChange={handleUserDataChange} placeholder='Enter Your Password' autoComplete='off' className='input-field' required />
                        <span className='toggle-password' onClick={togglePassword}>  {showPassword ? <FaEye /> : < FaEyeSlash />}  </span>
                      </div>
                    </div>
                  </div>

                  <div className="row px-3 py-1">
                    <div className="col-12 d-flex justify-content-between remember_forget_main ">
                      <div>
                        <input type='checkbox' /> Remember Me
                      </div>
                      <NavLink to="/forgetPassword" className="forget_password"> <p>  Forget Password ? </p> </NavLink>
                    </div>
                  </div>

                  <div className="row  px-3 mb-3  mx-0">
                    <div className="col-12 loginBtn ">
                      <button type='submit' className='loginBtn'>login</button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <p className='text-center'>Don't have an acoount ? <NavLink to="/register" className='go_to_register'>  <span > Registration </span> </NavLink></p>
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

export default Login