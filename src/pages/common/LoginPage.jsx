import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../apis/user";
import { ReactComponent as Logo } from "../../assets/logo-01.svg";
import BackButtonHeader from "../../components/common/BackButtonHeader";
import AlertBox from "../../components/common/accounts/AlertBox";
import InputGroup from "../../components/common/accounts/InputGroup";
import Box from "../../components/common/atoms/Box";
import Button from "../../components/common/atoms/Button";
import Container from "../../components/common/atoms/Container";
import useInput from "../../hooks/useInput";
import { logIn, setUserInfo } from "../../store/slices/userSlice";
import { validateEmail, validatePassword } from "../../utils";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";
import GuestLoginSheet from "./GuestLoginSheet";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // login api 호출 중인지 아닌지 확인
  const { values, handleChange, setValues } = useInput({
    email: "",
    password: "",
  });

  const [isGuestLoginSheetOpen, setIsGuestLoginSheetOpen] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const dispatch = useDispatch();
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const setErrorMessageAndFocus = (message, ref) => {
    setErrorMessage(message);
    ref.current.focus();
  };

  const handleLogin = async () => {
    if (!values.email) {
      setErrorMessageAndFocus("이메일을 입력해주세요.", emailInputRef);
      return;
    }
    if (!values.password) {
      setErrorMessageAndFocus("비밀번호를 입력해주세요.", passwordInputRef);
      return;
    }
    if (!validateEmail(values.email) || !validatePassword(values.password)) {
      // validation check fail시 api 호출하지 않음
      setErrorMessage("");
      setIsSubmitting(true);
      setTimeout(() => {
        setErrorMessage("이메일 또는 비밀번호를 잘못 입력했습니다. ");
        setIsSubmitting(false);
      }, 500);
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await login({
        email: values.email,
        password: values.password,
      });

      dispatch(logIn());
      dispatch(setUserInfo(res.data)); // 로그인 응답을 Redux store에 저장
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case 2001:
          setErrorMessageAndFocus(error.message, emailInputRef);
          break;
        case 2002:
          setErrorMessageAndFocus(error.message, passwordInputRef);
          break;
        default:
          defaultErrorHandler(error);
          setErrorMessage("이메일 또는 비밀번호를 잘못 입력했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 첫 렌더링 시 email input에 focus
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  return (
    <Container className="max-w-none">
      {isGuestLoginSheetOpen && (
        <GuestLoginSheet
          isOpen={isGuestLoginSheetOpen}
          onClose={() => setIsGuestLoginSheetOpen(false)}
          onSelectUser={({ email, password }) => {
            setValues({ email, password });
            setIsGuestLoginSheetOpen(false);
          }}
        />
      )}
      <BackButtonHeader>
        <span className="text-sm w-full text-center font-medium">로그인</span>
      </BackButtonHeader>
      <div className="flex items-center justify-center mt-[70px]">
        <Logo className="w-[200px] h-auto" />
      </div>
      <Box className="relative h-full mx-auto px-[29px] mt-[30px] text-xs justify-center">
        <form>
          <InputGroup
            id="email"
            type="email"
            name="email"
            label="이메일"
            placeholder="이메일"
            value={values.email}
            onChange={handleChange}
            className="relative pt-[15px]"
            ref={emailInputRef}
          />
          <InputGroup
            id="password"
            type="password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
            className="relative pt-[15px]"
            ref={passwordInputRef}
          />
          {errorMessage && (
            <AlertBox
              id="errorMessage"
              className="mt-[10px] pl-[20px] py-[15px] text-xs rounded-[10px] border font-bold"
              label={errorMessage}
            />
          )}
          {isSubmitting ? (
            <div className=" w-full h-[50px] mt-[30px] bg-zinc-200 rounded-[10px] flex items-center justify-center">
              <CircularProgress color="primary" size={30} />
            </div>
          ) : (
            <Button
              onClick={handleLogin}
              disabled={isSubmitting}
              className={`block w-full h-[50px] mt-[30px] rounded-[10px] font-normal text-sm ${
                isSubmitting ? "bg-zinc-300" : "bg-[#A7CFFF]"
              }`}
            >
              로그인
            </Button>
          )}

          <div className="flex items-center justify-center gap-2 pt-5 tracking-tight">
            <span>아직 계정이 없으신가요?</span>
            <Link className="font-bold underline " to="/signup">
              회원가입
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2 tracking-tight">
            <button
              type="button"
              className="font-bold underline"
              onClick={() => setIsGuestLoginSheetOpen(true)}
            >
              회원가입 없이 체험하기
            </button>
          </div>
        </form>
      </Box>
    </Container>
  );
}
