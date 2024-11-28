import React, { useEffect, useRef, useState } from 'react'
import "./verifyOtp.css"
import "../ForgetPassword/forgetPassword.css"
import { useNavigate } from 'react-router-dom'
import apis from '../../utils/api'
import Timer from '../Timer'
import toast from 'react-hot-toast'


const VerifyOtp = () => {


  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];
  const [otpTime, setOtpTime] = useState(null);
  const [isexpire, setIsExpire] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus()
    }
  }, []);

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  const otpArray = [setOtp1, setOtp2, setOtp3, setOtp4, setOtp5, setOtp6]

  const inputChange = (event, location) => {
    if (location < 5 && event.target.value) {
      inputRef[location + 1].current.focus();
    }

    otpArray[location](event.target.value);

  }

  const handleVerify = async (e) => {
    e.preventDefault();

    const finalOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
    console.log(finalOtp);

    try {
      const response = await fetch(apis().otpverify, {
        method: 'POST',
        body: JSON.stringify({ otp: finalOtp }),
        headers: { "Content-Type": "application/json" }
      })

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message)
      }

      if (result?.status) {
        console.log(result);
        toast.success(result?.message)
        navigate("/resetPassword")
      }

    } catch (error) {
      toast.error(error.message);
    }

  };

  useEffect(() => {

    const getTime = async () => {
      try {
        const response = await fetch(apis().getOtpTime, {
          method: "POST",
          body: JSON.stringify({ token: localStorage.getItem("passToken") }),
          headers: { "Content-Type": "application/json" }
        })


        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message)
        }

        if (result?.status) {
          const remainingTime = new Date(result?.sendTime).getTime() - new Date().getTime()

          if (remainingTime > 0) {
            setOtpTime(remainingTime);
          } else {
            setIsExpire(true);
          }

        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    getTime();
  }, []);

  const resendHandler = async () => {

    try {
      const response = await fetch(apis().forgetPassword, {
        method: "POST",
        body: JSON.stringify({ email: localStorage.getItem("email") }),
        headers: { "Content-Type": "application/json" }
      })

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message)
      }

      if (result?.status) {
        toast.success(result?.message);
        localStorage.setItem("passToken", result?.token);
        setOtpTime(1 * 60 * 1000);
        setIsExpire(false);
      }

    } catch (error) {
      toast.error(error.message)
    }
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
              <form onSubmit={handleVerify}>
                <div className="container login_form">

                  <div className="row px-0 px-sm-3 pt-5 pb-1">
                    <div className="col-12">
                      <h3 className='forget_password_heading'>Enter OTP</h3>
                    </div>
                  </div>

                  <div className="row px-0 px-sm-3  pb-1">
                    <div className="col-12">
                      <p className='forget_password_para'>Please enter the 6 digit code that send to your email Address</p>
                    </div>
                  </div>

                  <div className="row px-0 px-sm-3 py-2  verifyOtpInputRow">
                    <div className="col-12">
                      <div className="row">
                        {inputRef.map((item, index) => {
                          return <div className='col-2 otpBox_container' key={index}>
                            <input
                              onChange={(event) => inputChange(event, index)}
                              onInput={(event) => {
                                if (event.target.value.length > 1) {
                                  event.target.value = event.target.value.slice(0, 1)
                                }
                              }}
                              onKeyPress={(event) => {
                                // Only allow numeric characters (0-9)
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              ref={item}
                              type='text'
                              inputMode="numeric"
                              key={index}
                              required
                              className='inputfield'
                            />
                          </div>
                        })}


                      </div>
                    </div>


                  </div>





                  <div className="row px-0 px-sm-3 pb-3 ">
                    <div className="col-12 otpBtn">
                      <button type='submit' className='verifyBtn' onClick={handleVerify}>Verify</button>
                    </div>
                  </div>

                  <div className="row px-0 px-sm-3 pb-3 ">
                    <div className="col-12 timer">
                      {otpTime !== null && !isexpire ? (
                        <Timer setIsExpire={setIsExpire} time={otpTime} />) : <span onClick={resendHandler} >Resend</span>}
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

export default VerifyOtp