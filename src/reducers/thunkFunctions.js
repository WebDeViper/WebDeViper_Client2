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

export const profileUser = createAsyncThunk('user/categoryUser', async (body, thunkAPI) => {
  try {
    const response = await API.patch('/user/profile', body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data || error.message);
  }
});

export const createGroup = createAsyncThunk('group/createGroup', async (body, thunkAPI) => {
  try {
    const response = await API.patch('/group/~~', body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data || error.message);
  }
});
