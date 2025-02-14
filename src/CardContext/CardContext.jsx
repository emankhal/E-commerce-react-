import axios from 'axios';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export let cardContext = createContext();

export default function CardContext({ children }) {
    let [numOfCartItems, setNumOfCartItems] = useState(0)
    let [totalCartPrice, setTotalCartPrice] = useState(0)
    let [laoding, setlaoding] = useState(false)
    let [products, setProducts] = useState(null)
    let token = localStorage.getItem("userToken")
    let[id,setid]=useState(null)
    
    async function addToCard(productId) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",
            {
                productId
            },
            {
                headers: {

                    token

                }
            }
        )
            .then(res => {

                console.log(res);

                return res

            })
            .catch(err => {


                return err
            })

    }
    function loggedUserCard() {
        axios.get("https://ecommerce.routemisr.com/api/v1/cart",
            {
                headers: {
                    token
                }
            })
            .then(res => {
                setlaoding(true)
                setNumOfCartItems(res.data.numOfCartItems)
                setTotalCartPrice(res.data.data.totalCartPrice)
                setProducts(res.data.data.products)
                
                setid(res.data.cartId)
                setlaoding(false)

            })
            .catch(err => {
                console.log(err);
            })

    }
    async function removeItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers: {
                    token
                }
            })
            .then(res => {
                console.log(res);
                setNumOfCartItems(res.data.numOfCartItems)
                setTotalCartPrice(res.data.data.totalCartPrice)
                setProducts(res.data.data.products)
                return true

            })
            .catch(err => {
                console.log(err);
                return false
            })
    }
    function updatetProduct(id, count) {
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {

                count

            },
            {
                headers: {
                    token
                }
            }
        ).then(res => {
            console.log(res);
            setNumOfCartItems(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)
            setProducts(res.data.data.products)
        })
            .catch(err => {
                console.log(err);
            })
    }
     async function removeCard() {
        return axios.delete("https://ecommerce.routemisr.com/api/v1/cart",
            {
                headers: {
                    token
                }
            }).then(res => {
                console.log(res);
                setNumOfCartItems(0)
                setTotalCartPrice(0)
                setProducts(null)
                
                
                
            }).catch(err => {
                console.log(err);
            })

        
    }
    return (
        <cardContext.Provider value={{laoding,id, addToCard, loggedUserCard, numOfCartItems, totalCartPrice, products, removeItem, updatetProduct,removeCard }}>
            {children}
        </cardContext.Provider>
    );
}