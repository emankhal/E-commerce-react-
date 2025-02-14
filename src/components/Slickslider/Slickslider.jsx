import Slider from 'react-slick';
import style from './Slickslider.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Slickslider() {
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  async function getData() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Slider {...settings} >
        {categories.map((category) => (
          <div key={category._id} className="p-2">
            <img className="aspect-square w-full" src={category.image} alt={category.name} />
            <h4 className="text-center mt-2">{category.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}