import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createGroup } from './thunkFunctions';

const initialState = {
  groupInfo: {
    id: '',
    name: '',
    password: '',
    category: null,
    groupImg: '',
  },
  isLoading: false,
  error: '',
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {}, // You can add reducer functions here if needed
  extraReducers: builder => {
    builder
      .addCase(createGroup.pending, state => {
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload.userInfo;
        state.isAuth = true;
        localStorage.setItem('accessToken', action.payload.token);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default groupSlice.reducer;
