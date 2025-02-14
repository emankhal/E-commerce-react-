
import { useFormik } from 'formik'
import style from './Login.module.css'
import * as Yup from "yup"
import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../CreatContext/CreatContext'
import { Helmet } from 'react-helmet'

export default function Login() {
  let {setToken}=useContext(authContext)
  let [apiError, seterror] = useState(null)
  let [loading, setLoading] = useState(false)
  let navegat=useNavigate()
  async function Login(values) {

    try {
      setLoading(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      // console.log(data);
      localStorage.setItem("userToken",data.token)
      setToken(data.token)
      navegat("/home")
    } catch (error) {

    //  if (error.response.stutus==409) {
      seterror(error.response.data.message)
    //  }
      setLoading(false)

    }

  }
  // function validData(values) {

  //   let errors = {}
  //   if (!values.name) {
  //     errors.name = "name is requird"

  //   }
  //   else if (!/^[A-Z]\w{3,10}$/.test(values.name)) {
  //     errors.name = "invalid data"
  //   }
  //   if (!values.phone) {
  //     errors.phone = "phone is requird"

  //   }
  //   else if (!/^01[0152][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = "invalid phone"
  //   }
  //   return errors;

  // }
  let validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
    
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    }, validationSchema: validationSchema
    // , validate: validData
    , onSubmit: Login
  })

  return (<>
    <Helmet>
      <title>
        Login
      </title>
    </Helmet>
    <div>
      <form onSubmit={formik.handleSubmit} className="md:w-full capitalize">
        {apiError && <div className="p-4 text-center font-bold mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div>}

        <h2 className='text-3xl font-bold my-3'>Login now</h2>


        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-priring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-priring-primary" placeholder="enter your Email " />
        </div>
        {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-priring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-priring-primary" placeholder="enter your Password " />
        </div>
        {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}
        </div>}
       
        <div className="btn flex item justify-between">
          {loading ? <button type="button" className="text-white   bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-prbg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-prbg-primary ">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button> : <button type="submit" className="text-white   bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-prbg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-prbg-primary ">Submit</button>}
          <Link to={"/forgetPassword"} className="text-start p-3 ">
        forget your password ?
        </Link>

        </div>
        
      </form>

    </div>
    </>
  )
}
