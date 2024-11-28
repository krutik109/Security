import React, { useState } from 'react'
import "./Register.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import apis from '../../utils/api';
import toast from 'react-hot-toast';

const Register = () => {

  const [errors, setErrors] = useState({});

  // Model
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };   // Function to toggle modal visibility

  const [societyName, setSocietyName] = useState(() => {
    const data = localStorage.getItem("societyName")
    return data ? JSON.parse(data) : [];
  })

  const [inputValue, setInputValue] = useState({
    societyName: "",
    societyAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: ""
  })

  const handleInputValue = (e) => {
    return (
      setInputValue({
        ...inputValue,
        [e.target.name]: e.target.value
      })
    )
  }

  const handleSocietySaveBtn = () => {

    const { societyName, societyAddress, country, state, city, zipCode } = inputValue;

    if (!societyName || !societyAddress || !country || !state || !city || !zipCode) {
      alert("Please fill in all required fields.");
      return; // Stop the function if any required field is missing
    }

    setSocietyName(prevSocietyName => [...prevSocietyName, societyName]);

    setInputValue({
      societyName: "",
      societyAddress: "",
      country: "",
      state: "",
      city: "",
      zipCode: ""

    })

    toggleModal();
  }

  localStorage.setItem("societyName", JSON.stringify(societyName));


  // navigate
  const navigate = useNavigate();


  // password icon
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  }


  // Form Main

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    society: "",
    password: "",
    confirmPassword: ""
  });


  const handleUserData = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    let formErrors = {};
    if (!user.firstName || user.firstName.length < 2) formErrors.firstName = "First name must be at least 2 characters";
    if (!user.lastName || user.lastName.length < 2) formErrors.lastName = "Last name must be at least 2 characters";
    if (!user.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) formErrors.email = "Enter a valid email";
    if (!user.phoneNumber || user.phoneNumber.length < 10 || user.phoneNumber.length > 15) formErrors.phoneNumber = "Phone number must be between 10-15 digits";
    if (!user.country) formErrors.country = "Country is required";
    if (!user.state) formErrors.state = "State is required";
    if (!user.city) formErrors.city = "City is required";
    if (!user.society) formErrors.society = "Society is required";
    if (!user.password || user.password.length < 8) formErrors.password = "Password must be at least 8 characters";
    if (user.password !== user.confirmPassword) formErrors.confirmPassword = "Passwords do not match";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };


  const handleRegisterForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if there are validation errors
    }

    const { firstName, lastName, email, phoneNumber, country, state, city, society, password, confirmPassword } = user;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(apis().registerUser, {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, phoneNumber, country, state, city, society, password }),
        headers: { "Content-Type": "application/json" }
      })

      const result = await response.json();

      console.log(response);
      console.log(result);
      if (!response.ok) {
        throw new Error(result?.message);
      }

      if (result?.status) {
        toast.success(result?.message);
        navigate("/login");
      }

    } catch (error) {
      toast.error(error.message)
    }

    setUser({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      country: "",
      state: "",
      city: "",
      society: "",
      password: "",
      confirmPassword: ""
    })
  }
  return (
    <>
      <div className="container-fluid register_main">
        <div className="row ">
          {/* left side */}
          <div className=" col-12 col-md-6 col-lg-6   left-side-main ">
            <div className="left-side">
              <div className='mb-5'>
                <img src='/Images/LogoMain.png' className='left-side-logo img-fluid' />
              </div>

              <div className='right-main-img mt-5'>
                <img src='/Images/Registration-img1.png' className='img-fluid main-img' />
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 register-side-main  ">
            <div className='register-content'>
              <form onSubmit={handleRegisterForm}>
                <div className="container registration-container ">


                  <div className="row">
                    <div className="col-12">
                      <div className='px-3 pb-3'>
                        <h3 className='register_heading'>Registration</h3>
                      </div>
                    </div>
                  </div>


                  <div className="row  px-3 py-0 py-sm-2">
                    <div className="col-12 col-sm-6 ">
                      <label htmlFor='firstName'>First Name <span className='star-color'>*</span> </label>
                      <input type='text' name='firstName' value={user.firstName} onChange={handleUserData} id='firstName' className='input-field' required placeholder='Enter First Name' />
                      {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                    </div>
                    <div className="col-12 col-sm-6 py-2 py-sm-0">
                      <label htmlFor='lastName'>Last Name<span className='star-color'>*</span></label>
                      <input type='text' name='lastName' value={user.lastName} onChange={handleUserData} id='lastName' className='input-field' required placeholder='Enter Last Name' />
                      {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="row  px-3 py-0 py-sm-2">
                    <div className="col-12 col-sm-6">
                      <label htmlFor='email'>Email Address <span className='star-color'>*</span></label>
                      <input type='email' name='email' value={user.email} onChange={handleUserData} id='email' className='input-field' required placeholder='Enter Email Address' />
                      {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    <div className="col-12 col-sm-6 py-2 py-sm-0">
                      <label htmlFor='phoneNumber'>Phone Number <span className='star-color'>*</span></label>
                      <input type='number' name='phoneNumber' value={user.phoneNumber} onChange={handleUserData} className='input-field' id='phoneNumber' required placeholder='91+' />
                      {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
                    </div>
                  </div>

                  <div className="row  px-3 py-0 py-sm-2">
                    <div className="col-12 col-sm-4 py-2 py-sm-0">
                      <label htmlFor='country'>Country <span className='star-color'>*</span></label>
                      <input type='text' name='country' value={user.country} onChange={handleUserData} id='country' className='input-field' required placeholder='Enter Name' />
                      {errors.country && <p className="error-text">{errors.country}</p>}
                    </div>
                    <div className="col-12 col-sm-4 py-2 py-sm-0">
                      <label htmlFor='state'>State <span className='star-color'>*</span></label>
                      <input type='text' name='state' value={user.state} onChange={handleUserData} id='state' className='input-field' required placeholder='Enter Name' />
                      {errors.state && <p className="error-text">{errors.state}</p>}
                    </div>
                    <div className="col-12 col-sm-4 py-2 py-sm-0">
                      <label htmlFor='city'>City <span className='star-color'>*</span></label>
                      <input type='text' name='city' value={user.city} onChange={handleUserData} id='city' className='input-field' required placeholder='Enter Name' />
                      {errors.city && <p className="error-text">{errors.city}</p>}
                    </div>
                  </div>

                  <div className="row  px-3 py-0 py-sm-2">
                    <div className="col-12 py-3 py-sm-0">
                      <label htmlFor='society'>Select Society <span className='star-color'>*</span></label>
                      <select name='society' value={user.society} onChange={handleUserData}>

                        <option value="Shantigram Society" >Shantigram Society</option>
                        {societyName.map((society, index) => {
                          return <option key={index} value={society}>{society}</option>
                        })}
                      </select>
                      <button className='add_society_btn ' onClick={toggleModal}>Create Society</button>

                      {isModalOpen && (
                        <div className="modal-overlay">
                          <div className="modal-content-main">

                            <div className="container model-Container">
                              <div className="row px-3 mb-2 ">
                                <h3>Create New Society</h3>
                              </div>
                              <div className="row px-3 py-2" >
                                <div className="col-12 ">
                                  <label htmlFor='societyName'>Society Name<span className='star-color'>*</span></label>
                                  <input type='text' name='societyName' value={inputValue.societyName} onChange={handleInputValue} className='input-field' placeholder='Enter Name' autoComplete='off' required />
                                </div>
                              </div>

                              <div className="row px-3 py-2">
                                <div className="col-12 ">
                                  <label htmlFor='societyAddress'>Society Address<span className='star-color'>*</span></label>
                                  <input type='text' name='societyAddress' value={inputValue.societyAddress} onChange={handleInputValue} className='input-field' placeholder='Enter Address' autoComplete='off' required />
                                </div>
                              </div>

                              <div className="row px-3 py-2">
                                <div className="col-6 ">
                                  <label htmlFor='country'>Country <span className='star-color'>*</span></label>
                                  <input type='text' name='country' value={inputValue.country} onChange={handleInputValue} className='input-field' required placeholder='Enter Name' autoComplete='off' />
                                </div>
                                <div className="col-6">
                                  <label htmlFor='state'>State <span className='star-color'>*</span></label>
                                  <input type='text' name='state' value={inputValue.state} onChange={handleInputValue} className='input-field' required placeholder='Enter Name' autoComplete='off' />
                                </div>
                              </div>

                              <div className="row px-3 py-2">
                                <div className="col-6">
                                  <label htmlFor='city'>City <span className='star-color'>*</span></label>
                                  <input type='text' name='city' value={inputValue.city} onChange={handleInputValue} className='input-field' required placeholder='Enter Name' autoComplete='off' />
                                </div>
                                <div className="col-6">
                                  <label htmlFor='zipCode'>Zip Code <span className='star-color'>*</span></label>
                                  <input type='number' name='zipCode' value={inputValue.zipCode} onChange={handleInputValue} className='input-field' required placeholder='Enter Name' autoComplete='off' />
                                </div>
                              </div>

                              <div className="row px-3 py-3 mt-2">
                                <div className="col-6">

                                  <button onClick={toggleModal} className='cancelRegisterBtn '>Cancel</button>
                                </div>
                                <div className="col-6">
                                  <button type='submit' onClick={handleSocietySaveBtn} className='saveRegisterBtn' >Save</button>
                                </div>
                              </div>

                            </div>


                          </div>
                        </div>
                      )}

                    </div>

                  </div>

                  <div className="row  px-3 py-0 py-sm-2">
                    <div className="col-12">
                      <label htmlFor='password'>Password <span className='star-color'>*</span></label>
                      <div className='input-field-container' >
                        <input type={showPassword ? "text" : "password"} value={user.password} onChange={handleUserData} name='password' className='input-field password-input' id='password' required placeholder='Enter Password' />
                        <span className='toggle-password' onClick={togglePassword}>  {showPassword ? <FaEye /> : < FaEyeSlash />}  </span>
                      </div>
                      {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>
                  </div>

                  <div className="row  px-3 py-3 py-sm-2">
                    <div className="col-12">
                      <label htmlFor='confirmPassword'>Confirm Password <span className='star-color'>*</span></label>
                      <div className='input-field-container' >
                        <input type={showPassword ? "text" : "password"} value={user.confirmPassword} onChange={handleUserData} name='confirmPassword' className='input-field password-input' id='confirmPassword' required placeholder='Enter Confirm Password' />
                        <span className='toggle-password' onClick={togglePassword}>  {showPassword ? <FaEye /> : < FaEyeSlash />}  </span>
                      </div>
                      {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                    </div>
                  </div>


                  <div className="row  px-3 py-3 py-sm-2">
                    <div className="col-12">
                      <input type='checkbox' /> I agree to all the Terms and  <span className='privacy-policy'> Privacy Policy </span>
                    </div>
                  </div>

                  <div className="row  px-3 py-2 mx-0">
                    <div className="col-12 registerBtn">
                      <button type='submit' className='registerBtn' onClick={handleRegisterForm}>Register</button>
                    </div>
                  </div>

                  <div className="row  px-3 ">
                    <div className="col-12">
                      <p className='text-center'>Already have an account ? <NavLink to="/login" className="login">Login</NavLink>  </p>
                    </div>
                  </div>

                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Register