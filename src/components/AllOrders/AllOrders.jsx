import axios from 'axios';
import style from './AllOrders.module.css';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
  const [userOrder, setUserOrder] = useState([]); // Initialize as an empty array
  const token = localStorage.getItem('userToken');
  const decodedToken = jwtDecode(token);

  function getUserOrders() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`)
      .then(res => {
        console.log(res.data);
        setUserOrder(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      <h1 className='text-center p-3 font-bold text-green-500 text-3xl capitalize w-full'>All Your Orders</h1>
      {userOrder.length > 0 ? (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
          {userOrder.map((order) => (
          <div key={order.id} className="order-item bg-gray-200 text-center leading-9 text-xl p-4 capitalize ">
            <div>
              <h3><span className='text-green-500 font-bold'>order-ID :</span> {order.id}</h3>
             <h3><span className='text-green-500 font-bold'>Is-Delivered :</span>  {order.isDelivered?<i className="fa-solid fa-check"></i>:<i className="fa-regular fa-circle-xmark"></i>}</h3>
              <h3><span className='text-green-500 font-bold'> is-paid :</span> {order.isPaid?<i className="fa-solid fa-check"></i>:<i className="fa-regular fa-circle-xmark"></i>}</h3>
              <h3><span className='text-green-500 font-bold'>total-price : </span>{order.totalOrderPrice} EGY</h3>
              <h3><span className='text-green-500 font-bold'>paid-type :</span> {order.paymentMethodType}</h3>
            </div>

          </div>
        
        ))}
        </div>
      ) : (
        
        <p className="text-center">No orders found.</p>
      )}
    </div>
  );
}