import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  let navigat=useNavigate()
  async function verifyCode(values) {
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values);
      console.log(response.data);
      navigat('/resetpassword')

    } catch (error) {
      console.error("Error verifying code:", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: ''
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required('Code is required')
    }),
    onSubmit: verifyCode
  });

  return (
    <div className='my-10 mx-5 capitalize'>
      <h1 className='text-2xl font-bold my-2'>Reset your account password</h1>
      <form className="my-6" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full my-5 group py-4 text-xl">
          <input
            type="tel"
            name="resetCode"
            id="floating_resetCode"
            className="w-full block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
          />
          <label htmlFor="floating_resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Code</label>
          {formik.touched.resetCode && formik.errors.resetCode ? (
            <div className="text-red-600 text-sm">{formik.errors.resetCode}</div>
          ) : null}
        </div>
        <button type="submit" className="p-4 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 text-lg dark:focus:ring-green-800">Verify</button>
      </form>
    </div>
  );
}