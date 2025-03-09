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
          to="portfolios/1"
          src="images/1_1.webp"
          alt="유희정 플래너 메인 사진"
          className="portfolio-image"
          plannerName="유희정 플래너"
          brideName="김연아 신부님"
          brideInstagram="@yunakim"
        />
        <MainPhoto
          to="portfolios/2"
          src="images/2_1.webp"
          alt="김아름 플래너 메인 사진"
          className="portfolio-image"
          plannerName="김아름 플래너"
          brideName="박신혜 신부님"
          brideInstagram="@ssinz7"
        />
      </Slider>
    </>
  );
};

export default MainCarousel;
