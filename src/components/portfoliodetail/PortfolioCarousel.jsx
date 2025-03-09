import { useEffect, useRef } from "react";
import Slider from "react-slick";
import SquarePhoto from "../common/atoms/SquarePhoto";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PortfolioCarousel.css";

const PortfolioCarousel = ({ portfolio }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: "progressive",
    pauseOnHover: false, // ✅ hover시 멈추지 않도록 설정
    // eslint-disable-next-line react/no-unstable-nested-components
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "custom-dots",
  };

  // ✅ 컴포넌트가 마운트된 후 autoplay 강제 트리거
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, []);

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Slider {...settings}>
        {portfolio.images?.map((image, index) => (
          <SquarePhoto
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            src={image}
            alt={`${portfolio.plannerName} 플래너 소개 사진 - ${index + 1}번`}
            className="portfolio-image"
          />
        ))}
      </Slider>
    </>
  );
};

export default PortfolioCarousel;
