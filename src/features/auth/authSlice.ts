// import AuthAPI from './AuthAPI';
// import { createSlice, } from '@reduxjs/toolkit';
// import useLocalStorage from '../hooks/useLocalStorage';

// interface Admin{
//   email: string;
//   name: string;
//   surname: string;
//   password: string;
//   phone: string;
// }

// const authApi = new AuthAPI();
// const login = authApi.login;
// const register = authApi.register;
// const logout = authApi.logout;

// const authSlice = createSlice({
//   name: 'adminAuth',
//   initialState: {
//     admin: null as Admin | null,
//     error: null,
//     success: false,
//     isLoading: false
//   },
//   reducers: {
//     getAdminCredentials: (state, action) => {
//       console.log('action.payload before: ', action.payload);
//       if (action.payload !== null) state.admin = action.payload;
//       else state.admin = null;
//       console.log('Something shaa dey happen!');
//     },
//     logout: (state) => {
//       state.admin = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//     .addCase(login.pending, (state) => {
//       state.isLoading = true;
//       state.success = false;
//       state.error = null;
//     })
//     .addCase(login.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.success = true;
    
//       if (action.payload) {
//         const { access_token, ...adminDetails } = action.payload; // Extract token
    
//         // Store admin details in state
//         state.admin = adminDetails as Admin;
    
//         // Save token to local storage if needed
//         useLocalStorage('set', { name: 'accessToken', value: access_token });
//       }
    
//       state.error = null;
//     })
//     .addCase(login.rejected, (state, action) => {
//       state.isLoading = false;
//       state.admin = null;
//       state.success = false;
      
//       // Ensure error is properly handled
//       state.error = action.payload?.message || 'Login failed';
//     })
//       .addCase(register.pending, (state) => {
//         state.isLoading = true;
//         state.success = false;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state) => {
//         state.isLoading = false;
//         state.success = true;
//         //   state.admin = null;
//         state.error = null;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.isLoading = false;
//         state.success = false;
//         state.admin = null;
//         // @ts-ignore
//         state.error = action.error.message;
//       }).addCase(logout.pending, (state) => {
//         state.isLoading = true;
//         state.success = false;
//         state.error = null;
//       }).addCase(logout.fulfilled, (state) => {
//         state.isLoading = false;
//         state.success = true;
//         //   state.admin = null;
//         state.error = null;
//         useLocalStorage('set', { name: 'adminDetails', value: null, });
//       })
//       .addCase(logout.rejected, (state, action) => {
//         state.isLoading = false;
//         state.success = false;
//         state.admin = null;
//         // @ts-ignore
//         state.error = action.error.message;
//       })
//   },
// });

// export const { reducer: auth, } = authSlice;
// export const { getAdminCredentials, } = authSlice.actions
import AuthAPI from './AuthAPI';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import useLocalStorage from '../hooks/useLocalStorage';

interface Admin {
  id?: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  phone: string;
}

// Define the API response type
interface LoginResponse {
  access_token: string;
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
          useLocalStorage('set', { name: 'accessToken', value: accessToken });
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

        useLocalStorage('set', { name: 'accessToken', value: null });
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
