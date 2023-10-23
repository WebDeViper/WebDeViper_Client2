import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userData: {
    id: string;
    email: string;
    name: string;
    role: number;
    image: string;
  };
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
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
  reducers: {},
});

export default userSlice.reducer;
