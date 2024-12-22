import authAPI from './authAPI';
import { createSlice, } from '@reduxjs/toolkit';
import useLocalStorage from '../hooks/useLocalStorage';

const authApi = new authAPI();
const login = authApi.login;
const register = authApi.register;

const authSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    admin: null,
    error: null,
    success: false,
    isLoading: false
  },
  reducers: {
    getAdminCredentials: (state, action) => {
      console.log('action.payload before: ', action.payload);
      if (action.payload !== null) state.admin = action.payload;
      else state.admin = null;
      console.log('Something shaa dey happen!');
    },
    logout: (state, action: unknown) => {
      state.admin = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        setTimeout(() => {
          state.success = false;
        }, 500);
        state.error = null;
        const {
          accessToken, actions, email, name,
          permissions, refreshToken, role, _id: id
        } = action.payload;
        state.admin = {
          accessToken, actions, email, name,
          permissions, refreshToken, role, id
        };
        useLocalStorage('set', { name: 'adminDetails', value: state.admin });
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.admin = null;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        //   state.admin = null;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.admin = null;
        state.error = action.error.message;
      });
  },
});

export default {
  auth: authSlice.reducer
};
export const { getAdminCredentials, logout } = authSlice.actions;