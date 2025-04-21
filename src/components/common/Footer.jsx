const Footer = () => {
  return (
    <div className="px-5 pt-5 pb-[10px] bg-[#f4f4f5] border-t border-lightgray-sunsu text-sm text-darkgray-sunsu">
      <div className="font-semibold flex gap-[10px]">
        <span>순수웨딩</span>
        <span>©Sunsu Wedding Corp.</span>
      </div>
      <div className="mb-5">
        투명한 가격으로 웨딩플래너와 예비 부부를 매칭하다.
      </div>
      <div className="text-[12px] pt-[40px] pb-[15px]">
        E-mail:{" "}
        <a href="mailto:nh0903@pusan.ac.kr" className="underline">
          nh0903@pusan.ac.kr
        </a>
      </div>
    </div>
  );
};

export default Footer;
