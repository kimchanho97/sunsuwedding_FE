import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../../apis/user";

const initialState = {
  isLogged: false,
  userInfo: {},
  loading: false,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (thunkAPI) => {
    try {
      const response = await getUserInfo();
      return response.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLogged = true;
    },
    logOut: (state) => {
      state.isLogged = false;
      state.userInfo = {};
      window.location.href = "/";
    },
    setUserInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      }; // 로그인 응답으로 받은 유저 정보 저장
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserInfo
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = { ...state.userInfo, ...action.payload };
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { logIn, logOut, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
