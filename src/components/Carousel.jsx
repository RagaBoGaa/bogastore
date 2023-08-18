import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { sliderImages } from "../utils/imgs";

function Carousel() {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="mx-auto mt-5 max-h-[300px] max-w-6xl overflow-y-hidden">
      <Slider {...settings}>
        <div className="max-h-[300]">
          <img src={sliderImages[0]} alt="a prototype image for the slider" />
        </div>
        <div className="max-h-[300]">
          <img src={sliderImages[1]} alt="a prototype image for the slider" />
        </div>
      </Slider>
    </div>
  );
}
export default Carousel;
