import { createSlice } from '@reduxjs/toolkit';
import { authUser, loginUser } from './thunkFunctions';
import { toast } from 'react-toastify';

const initialState = {
  userInfo: {
    id: '',
    email: '',
    nickName: '',
    category: null,
    profileImg: '',
  },
  isAuth: false,
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 동기적으로 백에 요청 없이 프론트에서 로그아웃시키는 코드
    // state 변경하고 로컬 스토리지 값을 초기화
    logout(state) {
      state.isLoading = false;
      state.userInfo = initialState.userInfo;
      state.isAuth = false;
      localStorage.clear();
    },
  }, // You can add reducer functions here if needed
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.userInfo;
        state.isAuth = true;
        localStorage.setItem('accessToken', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(authUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.userInfo;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userInfo = initialState.userInfo;
        state.isAuth = false;
        localStorage.removeItem('accessToken');
      });

    // .addCase(logoutUser.pending, state => {
    //   state.isLoading = true;
    // })
    // .addCase(logoutUser.fulfilled, state => {
    //   state.isLoading = false;
    //   state.userInfo = initialState.userInfo;
    //   state.isAuth = false;
    //   localStorage.clear();
    // })
    // .addCase(logoutUser.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    //   toast.error(action.payload);
    // });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
