import axios from 'axios';
import React, { createContext, useState } from 'react';

export let wishListContext = createContext();

export default function WishListContext({ children }) {
  let[wishProducts,setWishProducts]=useState(null)
  async function getApi(productId) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {

      productId: productId

    }, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    }).then(res => {
      console.log(res);
      return res;
    }).catch(err => {
      console.log(err);
      return err;
    })
  }
  function getWishList() {
    axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: localStorage.getItem("userToken")
      }
    }).then(res => {
      console.log(res);
      setWishProducts(res.data.data)
      
    }).catch(err => {
      console.log(err);
      
    })
  }
  async function deleteWishList(productId) {
     return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    }).then(res => {
      console.log(res);
      getWishList()
      return res
    }).catch(err => {
      console.log(err);
      return err
    })
  }

  return (
    <wishListContext.Provider value={{ getApi ,getWishList,wishProducts,deleteWishList}}>
      {children}
    </wishListContext.Provider>
  );
}