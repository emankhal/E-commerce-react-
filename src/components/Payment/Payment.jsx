import axios from 'axios';
import { Formik, useFormik, validateYupSchema } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import { cardContext } from '../../CardContext/CardContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Payment() {
  <Helmet>
    <title>
      Payment
    </title>
  </Helmet>
  let {id}=useContext(cardContext)
  let[cash,setCash]=useState(false)
  let navegate=useNavigate()
  function cashPayment() {
    const shippingAddress = {
      shippingAddress: values
    };
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,
     shippingAddress,
      {
        headers: {
          token: localStorage.getItem('userToken')
        }
      }
    ).then(res => {
      console.log(res);
      navegate('/allorders')


    }).catch(err => {
      console.log(err);
    })
    


  }
  function onlinePayment(values){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:5173`,values,
      {
        headers: {
          token: localStorage.getItem('userToken')
        }
      }
    ).then(res => {
      console.log(res);
      window.open(res.data.session.url,"_self")

    }).catch(err => {
      console.log(err);
    })
  }
  let validationSchama = Yup.object().shape({
    details: Yup.string().required('details is required'),
    phone: Yup.string().required('phone is required'),
    city: Yup.string().required('city is required')

  })
  function paymentMethod(values){
    const shippingAddress = {
      shippingAddress: values
    };
    if(cash){
      cashPayment(shippingAddress)
    }else{
      onlinePayment(shippingAddress)
    }
  }
  let { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: paymentMethod,
    validationSchema: validationSchama
  })
  return (
    <div>
      <form className="w-full my-5" onSubmit={handleSubmit}>
        <label htmlFor="Details" className="block mb-2 my-3 text-sm font-medium text-gray-900 dark:text-white">Your Details</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.details} name='details' type="text" id="Details" aria-describedby="helper-text-explanation" className="bg-gray-50 my-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="your Details" />
        {errors.details && touched.details && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errors.details}
        </div>}
        <label htmlFor="phone" className="block mb-2 my-3 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.phone} name='phone' type="tel" id="phone" aria-describedby="helper-text-explanation" className="bg-gray-50 my-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="your phone" />
        {errors.phone && touched.phone && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errors.phone}
        </div>}
        <label htmlFor="city" className="block mb-2 my-3 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.city} name='city' type="text" id="city" aria-describedby="helper-text-explanation" className="bg-gray-50 my-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="your city" />
        {errors.city && touched.city && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errors.city}
        </div>}
       <div className="btn flex items-center w-1/2">
       <button onClick={()=>{setCash(true)}} type="submit" className="text-green-700 hover:text-white border w-full my-4 transition-all border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800">pay cash</button>
       <button onClick={()=>{setCash(false)}} type="submit" className="text-green-700 hover:text-white border w-full my-4 transition-all border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800">pay online</button>
       </div>
      </form>
    </div>
  )
}
