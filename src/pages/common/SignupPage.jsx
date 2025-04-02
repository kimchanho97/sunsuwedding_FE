import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useRef, useState } from "react";
import { signup } from "../../apis/user";
import BackButtonHeader from "../../components/common/BackButtonHeader";
import AlertBox from "../../components/common/accounts/AlertBox";
import InputGroup from "../../components/common/accounts/InputGroup";
import SignupCompletionSheet from "../../components/common/accounts/SignupCompletionSheet";
import Box from "../../components/common/atoms/Box";
import Button from "../../components/common/atoms/Button";
import Container from "../../components/common/atoms/Container";
import Label from "../../components/common/atoms/Label";
import useDefaultErrorHander from "../../hooks/useDefaultErrorHandler";
import useInput from "../../hooks/useInput";
import { validateEmail, validatePassword } from "../../utils";

const USER_TYPE = {
  COUPLE: 1,
  PLANNER: 2,
};

export default function SignupPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [activeButton, setActiveButton] = useState(USER_TYPE.COUPLE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompletionSheetOpen, setIsCompletionSheetOpen] = useState(false); // 회원가입 완료 시 나타나는 bottom sheet

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const password2InputRef = useRef(null);
  const { defaultErrorHandler } = useDefaultErrorHander();
  const { values, handleChange, setValues } = useInput({
    role: "couple",
    email: "",
    password: "",
    password2: "",
    username: "",
  });

  // eslint-disable-next-line no-shadow
  const setErrorMessageAndFocus = (message, ref) => {
    setErrorMessage(message);
    ref.current.focus();
  };

  const setUserRole = (roleNumber) => {
    setActiveButton(roleNumber);
    if (roleNumber === USER_TYPE.COUPLE) {
      setValues({ ...values, role: "couple" });
      return;
    }
    setValues({ ...values, role: "planner" });
  };

  const validateInput = async () => {
    // 기존의 에러메세지가 존재
    if (errorMessage !== "") {
      setErrorMessage("");
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 300);
      });
    }
    if (!values.username) {
      setErrorMessageAndFocus("이름을 입력해주세요.", nameInputRef);
      return false;
    }
    if (!values.email) {
      setErrorMessageAndFocus("이메일을 입력해주세요.", emailInputRef);
      return false;
    }
    if (!validateEmail(values.email)) {
      setErrorMessageAndFocus("이메일 형식으로 입력해주세요.", emailInputRef);
      return false;
    }
    if (!values.password) {
      setErrorMessageAndFocus("비밀번호를 입력해주세요.", passwordInputRef);
      return false;
    }
    if (!validatePassword(values.password)) {
      setErrorMessageAndFocus(
        "비밀번호 형식에 맞게 입력해주세요.",
        passwordInputRef,
      );
      return false;
    }
    if (!values.password2) {
      setErrorMessageAndFocus(
        "비밀번호 확인을 입력해주세요.",
        password2InputRef,
      );
      return false;
    }
    if (values.password !== values.password2) {
      setErrorMessageAndFocus(
        "비밀번호가 일치하지 않습니다.",
        password2InputRef,
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!(await validateInput())) return;
    try {
      setIsSubmitting(true);
      await signup({
        role: values.role,
        email: values.email,
        password: values.password,
        password2: values.password2,
        username: values.username,
      });
      setIsCompletionSheetOpen(true);
    } catch (error) {
      if (error.code) {
        setErrorMessage(error.message); // 클라이언트 오류 메시지를 보여줌
        return;
      }
      defaultErrorHandler(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <Container className="h-full max-w-none">
      {isCompletionSheetOpen && (
        <SignupCompletionSheet
          onClose={() => setIsCompletionSheetOpen(false)}
        />
      )}
      <BackButtonHeader>
        <span className="text-sm w-full text-center font-medium">회원가입</span>
      </BackButtonHeader>
      <Box className="relative h-full mx-auto px-[29px] pt-[30px] text-xs justify-center">
        <form>
          <div className="pb-[5px]">
            <Label className="text-xs">회원 구분</Label>
          </div>
          <div className="flex gap-[25px]">
            <div className="flex-1">
              <button
                type="button"
                onClick={() => setUserRole(USER_TYPE.COUPLE)}
                className={`${
                  activeButton === USER_TYPE.COUPLE
                    ? "bg-lightskyblue-sunsu"
                    : "bg-white"
                } w-full h-[50px] rounded-[10px] text-sm text-gray-900 border border-lightgray-sunsu`}
              >
                예비 신랑신부
              </button>
            </div>
            <div className="flex-1">
              <button
                type="button"
                onClick={() => setUserRole(USER_TYPE.PLANNER)}
                className={`${
                  activeButton === USER_TYPE.PLANNER
                    ? "bg-lightskyblue-sunsu"
                    : "bg-white"
                } w-full h-[50px] rounded-[10px] text-sm text-gray-900 border border-lightgray-sunsu`}
              >
                웨딩플래너
              </button>
            </div>
          </div>
          <InputGroup
            ref={nameInputRef}
            id="username"
            type="text"
            name="username"
            label="이름"
            placeholder="이름"
            value={values.username}
            onChange={handleChange}
            className="relative pt-[15px]"
          />
          <div className="relative">
            <InputGroup
              ref={emailInputRef}
              id="email"
              type="email"
              name="email"
              label="이메일"
              placeholder="이메일"
              value={values.email}
              onChange={handleChange}
              className="relative pt-[15px] w-full"
            />
          </div>
          <InputGroup
            ref={passwordInputRef}
            id="password"
            type="password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
            className="relative pt-[15px]"
          />
          <InputGroup
            ref={password2InputRef}
            id="password2"
            type="password"
            name="password2"
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            value={values.password2}
            onChange={handleChange}
            className="relative pt-[15px] mb-[30px]"
          />
          {errorMessage && (
            <AlertBox
              id="errorMessage"
              className="mt-[10px] pl-[20px] py-[15px] text-xs rounded-[10px] border font-bold"
              label={errorMessage}
            />
          )}
          {isSubmitting ? (
            <div className=" w-full h-[50px] mt-[5px] bg-zinc-200 rounded-[10px] flex items-center justify-center mb-[50px]">
              <CircularProgress
                color="primary"
                style={{ width: "30px", height: "30px" }}
              />
            </div>
          ) : (
            <Button
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
              className={`block w-full h-[50px] mt-[5px] rounded-[10px] font-normal text-sm ${
                isSubmitting ? "bg-zinc-300" : "bg-lightskyblue-sunsu"
              } mb-[50px]`}
            >
              회원가입
            </Button>
          )}
        </form>
      </Box>
    </Container>
  );
}
