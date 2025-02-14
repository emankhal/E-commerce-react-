import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { wishListContext } from '../../wishListContext/WishListContext';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { cardContext } from '../../CardContext/CardContext';
import toast from 'react-hot-toast';

export default function WishList() {
  let { getWishList, wishProducts, deleteWishList } = useContext(wishListContext);
  let { addToCard } = useContext(cardContext);

  useEffect(() => {
    getWishList();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["wishProducts"],
    queryFn: getWishList,
  });

  async function addProductCrard(id) {
    try {
      let result = await addToCard(id);
      if (result.data) {
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error("Error adding to cart");
      console.error(error);
    }
  }
  async function deleteProductCrard(id) {
    try {
      let result = await deleteWishList(id);
      if (result.data) {
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error("Error adding to cart");
      console.error(error);
    }
  }

  if (isLoading) {
    return (
      <div role="status" className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Wish List</title>
      </Helmet>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 relative">
        {wishProducts?.map((product) => (
          <div key={product._id} className="overflow-hidden group cursor-pointer p-3 hover:shadow-[2px_2px_2px__2px#4fa74f60] hover:scale-[1.01] transition-all mr-3 my-3">
            <img src={product.imageCover} alt={product.name} className="w-full block" />
            <div className="description p-3">
              <h4 className='text-green-600'>{product.category.name}</h4>
              <h5 className='font-bold my-2'>{product.title.split(" ", 3).join(" ")}</h5>
              <div className="price flex items-center justify-between">
                <span>{product.price}</span>
                <div className='px-3'>
                  <i className="fa-solid fa-star text-yellow-400"></i>
                  <span>{product.ratingsAverage}</span>
                </div>
              </div>
            </div>
            <Link className="icone inline-block w-full text-end p-3">
              <i onClick={() => { deleteProductCrard(product._id) }} className="fa-solid fa-heart text-end text-2xl  my-4  cursor-pointer text-red-500 hover:text-black transition-all"></i>
            </Link>
            <div className="btn text-center capitalize w-full translate-y-[200%] group-hover:translate-y-[0] transition-all duration-300 ease-in-out">
              <button onClick={() => { addProductCrard(product._id) }} className='bg-[#4fa74f] capitalize py-3 px-5 rounded-lg text-white hover:bg-[#438d43] transition-all'>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}