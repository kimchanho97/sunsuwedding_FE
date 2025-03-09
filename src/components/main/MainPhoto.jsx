import Photo from "../common/atoms/Photo";
import { ReactComponent as Congratulations } from "../../assets/congratulations-01.svg";

const MainPhoto = ({
  className = "",
  src,
  alt,
  plannerName = "",
  brideName = "",
  brideInstagram = "",
}) => {
  return (
    <div
      className={`photo-wrapper relative xs:h-[600px] sm:h-[700px] h-[800px] ${className}`}
    >
      <div role="presentation">
        <Photo
          src={src}
          alt={alt}
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full">
          <div className="flex">
            <Congratulations className="mt-[5px] mx-auto xs:h-[80px] sm:h-[100px] h-[120px]" />
          </div>
          <div className="flex">
            <div className="ml-auto mr-4 text-right text-sm text-white">
              <div>{brideName}</div>
              <div>{brideInstagram}</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-[60%] h-full w-full overflow-hidden bg-gradient-to-b from-gradient-from-sunsu to-gradient-to-sunsu">
          <div className="flex">
            <div className="sm:mt-[195px] mt-[270px] ml-8 text-sm text-white font-bold">
              <div>{plannerName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPhoto;
