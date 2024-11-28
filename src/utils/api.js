const apis = ()=> {

  const local = "http://localhost:4000/"

  const list = {
    registerUser : `${local}user/register`,
    loginUser : `${local}user/login`,
    forgetPassword : `${local}user/forget/password`,
    otpverify : `${local}user/verify/otp`,
    getOtpTime : `${local}user/otp/time`,
    updatePassword: `${local}user/password/update`,
    getAccess: `${local}user/get/access`
  }

  return list;
}


export default apis;