
import { useFormik } from 'formik'
import style from './Register.module.css'
import * as Yup from "yup"
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../CreatContext/CreatContext'
import { Helmet } from 'react-helmet'

export default function Register() {
  <Helmet>
    <title>
      Register
    </title>
  </Helmet>
  let {setToken}=useContext(authContext)
  let [apiError, seterror] = useState(null)
  let [loading, setLoading] = useState(false)
  let navegat=useNavigate()
  async function register(values) {

    try {
      setLoading(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      console.log(data);
      localStorage.setItem("userToken",data.token)
      setToken(data.token)
      navegat("home")
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
    name: Yup.string().required('Name is required').min(3, 'Minimum three letters').max(15, 'Maximum 15 letters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string().required('Password is required'),
    rePassword: Yup.string().required('Re-enter Password is required').oneOf([Yup.ref('password')], 'Passwords do not match'),
    phone: Yup.string().required('Phone is required').matches(/^01[0152][0-9]{8}$/, 'Phone number must be Egyptian'),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }, validationSchema: validationSchema
    // , validate: validData
    , onSubmit: register
  })

  return (
    <div>
      <Helmet>
              <title>register</title>
            </Helmet>
     <div className="container m-auto">
     <form onSubmit={formik.handleSubmit} className="md:w-full capitalize">
        {apiError && <div className="p-4 text-center font-bold mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div>}

        <h2 className='text-3xl font-bold my-3'>register now</h2>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-priring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-priring-primary" placeholder="enter your name" />
        </div>
        {formik.errors.name && formik.touched.name && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.name}
        </div>}

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
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> rePassword</label>
          <input type="password" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="rePassword" name='rePassword' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-priring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-priring-primary" placeholder="enter your Re-password " />
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.rePassword}
        </div>}
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
          <input type="tel" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-priring-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-priring-primary" placeholder="enter your phone" />
        </div>
        {formik.errors.phone && formik.touched.phone && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.phone}
        </div>}
        <div className="btn text-end">
          {loading ? <button type="button" className="text-white   bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-prbg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-prbg-primary ">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button> : <button type="submit" className="text-white   bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-prbg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-prbg-primary ">Submit</button>}


        </div>
      </form>
     </div>

    </div>
  )
}
