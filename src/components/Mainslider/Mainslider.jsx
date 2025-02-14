import React from 'react';
import style from './Mainslider.module.css';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import Slider from 'react-slick';

export default function Mainslider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_2fr] w-1/2 m-auto ">
        <div className="slider overflow-hidden">
          <Slider {...settings}>
            <div>
              <img className="w-full block aspect-square h-[300px]" src={img1} alt="Slide 1" />
            </div>
            <div>
              <img className="w-full block aspect-square h-[300px]" src={img2} alt="Slide 2" />
            </div>
          </Slider>
        </div>
        <div className="images">
          <img className="w-full block h-[300px]" src={img3} alt="Image 3" />
          <img className="w-full block h-[300px]" src={img4} alt="Image 4" />
        </div>
      </div>
      </>

  );
}