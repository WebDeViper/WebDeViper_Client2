import { API } from '../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('user/loginUser', async (body, thunkAPI) => {
  try {
    const response = await API.post(`/user/kakao`, body);

    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data || error.message);
  }
});

export const authUser = createAsyncThunk('user/authUser', async (_, thunkAPI) => {
  try {
    const response = await API.get(`/user`);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data || error.message);
  }
});

// export const logoutUser = createAsyncThunk('user/logoutUser', async (_, thunkAPI) => {
//   try {
//     const response = await API.get(`/user/kakao/logout`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return thunkAPI.rejectWithValue(error.response.data || error.message);
//   }
// });
