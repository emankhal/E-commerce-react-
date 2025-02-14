import { useContext, useState } from 'react'
import './App.css'
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Products from './components/Products/Products'
import Notfound from './components/Notfound/Notfound'
import WishList from './components/Wish-list/Wish-list'
import Catrgories from './components/Catrgories/Catrgories'
import CreatContext from './components/CreatContext/CreatContext'
import ProtectRoute from './components/ProtectRoute/ProtectRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import CardContext from './CardContext/CardContext'
import Cards from './components/Cards/Cards'
import Payment from './components/Payment/Payment'
import AllOrders from './components/AllOrders/AllOrders'
import WishListContext from './wishListContext/WishListContext'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyCode from './components/Verify-code/Verify-code'
import ResetPassword from './components/Reset-password/Reset-password'

const queryClient = new QueryClient()

function App() {
  let router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: "", element: <ProtectRoute><Home /></ProtectRoute> },
        { path: "home", element: <ProtectRoute><Home /></ProtectRoute> },
        { path: "brands", element: <ProtectRoute><Brands /></ProtectRoute> },
        { path: "wishList", element: <ProtectRoute><WishList /> </ProtectRoute> },
        { path: "catrgories", element: <ProtectRoute><Catrgories /></ProtectRoute> },
        { path: "cart", element: <ProtectRoute><Cards /></ProtectRoute> },
        { path: "payment", element: <ProtectRoute><Payment /></ProtectRoute> },
        { path: "allorders", element: <ProtectRoute><AllOrders /></ProtectRoute> },
        { path: "login", element: <Login /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "verify", element: <VerifyCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "register", element: <Register /> },
        { path: "productDetails/:id/:category", element: <ProductDetails /> },
        { path: "products", element: <ProtectRoute><Products /></ProtectRoute> },
        { path: "*", element: <Notfound /> },
      ]
    }
  ]);
  // let token=useContext(TokenContext)
  // console.log(token);

  return (<QueryClientProvider client={queryClient}>
    <WishListContext>
    <CardContext>
      <CreatContext>
        <RouterProvider router={router} />
        <Toaster />
      </CreatContext>
    </CardContext>
    </WishListContext>
  </QueryClientProvider>


  );
}

export default App;