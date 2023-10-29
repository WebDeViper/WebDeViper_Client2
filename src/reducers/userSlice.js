import { createSlice } from '@reduxjs/toolkit';
import { authUser, loginUser, logoutUser } from './thunkFunctions';
import { toast } from 'react-toastify';

const initialState = {
  userData: {
    id: '',
    email: '',
    name: '',
    role: 0,
    image: '',
  },
  isAuth: false,
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}, // You can add reducer functions here if needed
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.userInfo;
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
        state.userData = action.payload.userInfo;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userData = initialState.userData;
        state.isAuth = false;
        localStorage.removeItem('accessToken');
      })

      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.userData = initialState.userData;
        state.isAuth = false;
        localStorage.removeItem('accessToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default userSlice.reducer;
