import { ReactComponent as LogoIcon } from "../../assets/logo-02.svg";
import HeaderRow from "../common/HeaderRow";
import { scrollToTop } from "../../utils/convert";

const MainHeaderRow = () => {
  return (
    <HeaderRow>
      <div className="flex justify-between items-center w-full px-1">
        <button onClick={scrollToTop} aria-label="순수웨딩 로고">
          <div className="">
            <LogoIcon className="my-auto h-[15px] w-[80px]" />
          </div>
        </button>
      </div>
    </HeaderRow>
  );
};

export default MainHeaderRow;
