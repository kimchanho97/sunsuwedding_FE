import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useOpenBottomSheet from "./useOpenBottomSheet";
import { logOut } from "../store/slices/userSlice";

export default function useDefaultErrorHandler() {
  const navigate = useNavigate();
  const { openBottomSheetHandler } = useOpenBottomSheet();
  const dispatch = useDispatch();

  const defaultErrorHandler = (error) => {
    switch (error.status) {
      case 500:
        openBottomSheetHandler({ bottomSheet: "serverErrorBottomSheet" });
        break;
      case 404:
        navigate("/404", { replace: true });
        break;
      case 403:
        openBottomSheetHandler({ bottomSheet: "forbiddenBottomSheet" });
        break;
      case 401:
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        dispatch(logOut());
        break;
      default:
        break;
    }
  };

  return { defaultErrorHandler };
}
