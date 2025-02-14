
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {
  let navigat=useNavigate()
  function submitForm() {
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
    .then(res=>{
      console.log(res);
      navigat("/verify")

    }).catch(err=>{
      console.log(err);
  })}
  let {handleSubmit,handleBlur,handleChange,handleReset,values,errors}=useFormik({
    initialValues: {
      email: ''
    },onSubmit:submitForm
  })
  return (
    <div className='my-10 mx-5 capitalize'onSubmit={handleSubmit}>
      <h1 className='text-2xl font-bold my-2'>please enter your verification code</h1>
      <form className="my-6">
        <div className="relative z-0 w-full my-5 group py-4 text-xl">
          <input onBlur={handleBlur} onChange={handleChange} value={values.email}  type="email" name="email" id="floating_email" className="w-full block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <button type="submit" className="p-4 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 text-lg dark:focus:ring-green-800">verify</button>
      </form>

    </div>
  )
}
