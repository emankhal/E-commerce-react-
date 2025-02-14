
import { Link, NavLink, useNavigate } from 'react-router-dom'
import style from './Navbar.module.css'
import { useContext, useEffect, useState } from 'react'
import { authContext } from '../CreatContext/CreatContext'
import { cardContext } from '../../CardContext/CardContext'

export default function Navbar() {
  let { token, setToken } = useContext(authContext)
  let [isOpen, setOpen] = useState(false)
  let { numOfCartItems, loggedUserCard } = useContext(cardContext)

  let navigate = useNavigate()
  function handelLogout() {
    navigate("/login")
    localStorage.removeItem("userToken")
    console.log("hello");

    setToken(null)


  }
  useEffect(() => {
    loggedUserCard()
  }, [numOfCartItems])
  return (
    <>
      <header className="fixed top-0 start-0 end-0 z-[999] inset-x-0 bg-gray-100 ">
        <nav className="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1 text-2xl">
            <Link to={""} className="flex items-center gap-2 font-bold">
              <i className="fa-solid fa-cart-shopping text-[#4fa74f]  text-3xl"></i>
              <h1 className="text-black">fresh cart</h1>

            </Link>
          </div>
          <div className="flex lg:hidden">
            <button onClick={() => { setOpen(!isOpen) }} type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-5 capitalize ">
            {token && <><NavLink to={""} className="text-sm/6 font-medium text-gray-600">Home</NavLink>
              <NavLink to={"cart"} className="text-sm/6 font-medium text-gray-600">card</NavLink>
              <NavLink to={"wishList"} className="text-sm/6 font-medium text-gray-600">wish list</NavLink>
              <NavLink to={"products"} className="text-sm/6 font-medium text-gray-600">products</NavLink>
              <NavLink to={"catrgories"} className="text-sm/6 font-medium text-gray-600">catrgories</NavLink>
              <NavLink to={"brands"} className="text-sm/6 font-medium text-gray-600">brands</NavLink></>}

          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3 items-center">
            
            {token ? <><Link to={"cart"}>
              <i className="fa-solid fa-cart-shopping text-gray-700 text-3xl relative">
                <span className="absolute -top-2 -right-2 bg-[#4fa74f] text-[12px] text-white rounded-full  p-1">{numOfCartItems}</span>
              </i>
            </Link><NavLink onClick={handelLogout} to={"login"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium text-gray-600 hover:bg-gray-50">Log out</NavLink></> :
              <>
                <NavLink to={"register"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium text-gray-600 hover:bg-gray-50">sign-up</NavLink>
                <NavLink to={"login"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium text-gray-600 hover:bg-gray-50">Log in</NavLink>
              </>
            }
          </div>
        </nav>
        {/* Mobile menu, show/hide based on menu open state. */}
        <div className={isOpen ? "lg-hidden" : "hidden"} role="dialog" aria-modal="true">
          {/* Background backdrop, show/hide based on slide-over state. */}
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to={""} className="flex items-center gap-2 font-bold">
                <i className="fa-solid fa-cart-shopping text-[#4fa74f]"></i>
                <h1 className="text-black">fresh cart</h1>
              </NavLink>
              <button onClick={() => { setOpen(!isOpen) }} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">fresh cart</span>
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {token && <>
                    <NavLink to={"/"} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-600 hover:bg-gray-50">Home</NavLink>
                    <NavLink to={"cart"} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-600 hover:bg-gray-50">card</NavLink>
                    <NavLink to={"wishList"} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-600 hover:bg-gray-50">wish list</NavLink>
                    <NavLink to={"products"} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-600 hover:bg-gray-50">products</NavLink>
                    <NavLink to={"catrgories"} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-600 hover:bg-gray-50">catrgories</NavLink>
                    <NavLink to={"brands"} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-gray-600 hover:bg-gray-50">brands</NavLink>
                    {token ? <NavLink onClick={handelLogout} to={"login"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium text-gray-600 hover:bg-gray-50">Log out</NavLink> :
                      <div className=" flex flex-col justify-center w-full">
                        <NavLink to={"register"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium text-gray-600 hover:bg-gray-50">sign-up</NavLink>
                        <NavLink to={"login"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium text-gray-600 hover:bg-gray-50">Log in</NavLink>
                      </div>
                    }
                  </>}

                </div>
                <div className="py-6 flex items-center">
                  {token ? <NavLink onClick={handelLogout} to={"login"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium text-gray-600 hover:bg-gray-50">Log out</NavLink> :
                    <div className=" flex flex-col justify-center w-full">
                      <NavLink to={"register"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium text-gray-600 hover:bg-gray-50">sign-up</NavLink>
                      <NavLink to={"login"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium text-gray-600 hover:bg-gray-50">Log in</NavLink>
                    </div>
                  }


                </div>
              </div>
            </div>
          </div>
        </div>
      </header>



    </>
  )
}
