import AuthAPI from './AuthAPI';
import useLocalStorage from '../hooks/useLocalStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Admin {
  id?: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  phone: string;
}

interface AuthState {
  admin: Admin | null;
  error: string | null;
  success: boolean;
  isLoading: boolean;
}

const authApi = new AuthAPI();
const login = authApi.login;
const register = authApi.register;
const logout = authApi.logout;

const initialState: AuthState = {
  admin: null,
  error: null,
  success: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    getAdminCredentials: (state, action: PayloadAction<Admin | null>) => {
      console.log('action.payload before:', action.payload);
      state.admin = action.payload;
      console.log('Something shaa dey happen!');
    },
    logout: (state) => {
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase(
      login.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.success = true;

        if (action.payload) {
          const { accessToken, ...adminDetails } = action.payload;
          state.admin = adminDetails; // Store admin details

          // Save token to local storage
          // useLocalStorage('set', { name: 'accessToken', value: accessToken });
          useLocalStorage('set', { name: 'adminDetails', value: action.payload });
        }

        state.error = null;
      }
    )
    .addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.admin = null;
      state.success = false;
      state.error = action.payload?.message || 'Login failed';
    })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.admin = null;
        state.error = action.error?.message || 'Registration failed';
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.admin = null;
        state.error = null;

        useLocalStorage('set', { name: 'adminDetails', value: null });
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.admin = null;
        state.error = action.error?.message || 'Logout failed';
      });
  },
});

export const { reducer: auth } = authSlice;
export const { getAdminCredentials } = authSlice.actions;