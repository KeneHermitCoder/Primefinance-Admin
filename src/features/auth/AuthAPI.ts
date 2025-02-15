import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, httpClient,  } from '../../utils';
class AuthAPI {

    register = createAsyncThunk(
        'admin/register',
        async (registrationDetails: {
            email: string;
            name: string;
            surname: string;
            password: string;
            phone: string;
  
        }, thunkAPI) => {
            try {
                const response = await httpClient({
                    method: 'POST',
                    url: '/api/users/create-admin',
                    data: {...registrationDetails},
                    // headers: options.headers,
                    // params: options.params,
                });
                return response;
            } catch (error: any) {
                thunkAPI.rejectWithValue(handleError(error));
            }
        });

     // Login User
  login = createAsyncThunk(
    'admin/login',
    async (loginDetails: { email: string, password: string }, thunkAPI) => {
      try {
        const response = await httpClient({
          method: 'POST',
          url: '/api/users/login',
          data: { ...loginDetails },
          isAuth: false
        })
        return response.data || {};
      } catch (error: any) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );
  users = createAsyncThunk('admin/get-users', async (_, thunkAPI) => {
    try {
            const response = await httpClient({
                method: 'POST',
                url: '/api/users/get-users',
                data: {},
                isAuth: true,
                // headers: options.headers,
                // params: options.params,
            });
            return response.data;
        } catch (error: any) {
            thunkAPI.rejectWithValue(handleError(error));
        }
  });

    logout = createAsyncThunk('admin/logout', async (_, thunkAPI) => {
        try {
                const response = await httpClient({
                    method: 'POST',
                    url: '/api/users/logout',
                    data: {},
                    isAuth: true,
                    // headers: options.headers,
                    // params: options.params,
                });
                return response.data;
            } catch (error: any) {
                thunkAPI.rejectWithValue(handleError(error));
            }
    });
}

export default AuthAPI;