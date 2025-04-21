import { useEffect, useRef } from "react";
import Slider from "react-slick";
import MainPhoto from "./MainPhoto";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MainCarousel.css";

const MainCarousel = () => {
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
        <MainPhoto
          src="images/wedding_3_compressed.webp"
          alt="유희정 플래너 메인 사진"
          className="portfolio-image"
          plannerName="유희정 플래너"
        />
        <MainPhoto
          src="images/wedding_1_compressed.webp"
          alt="김아름 플래너 메인 사진"
          className="portfolio-image"
          plannerName="김아름 플래너"
        />
        <MainPhoto
          src="images/wedding_13_compressed.webp"
          alt="최화정 플래너 메인 사진"
          className="portfolio-image"
          plannerName="최화정 플래너"
        />
        <MainPhoto
          src="images/wedding_5_compressed.webp"
          alt="박정현 플래너 메인 사진"
          className="portfolio-image"
          plannerName="박정현 플래너"
        />
      </Slider>
    </>
  );
};

export default MainCarousel;
