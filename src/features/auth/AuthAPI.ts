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
            console.log({ registrationDetails, })
            
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
                console.log({ error, });
                const errorResponse = handleError(error);
                thunkAPI.rejectWithValue(errorResponse);
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
        });
        console.log({ response });

        // Extract access token from the response
        const { accessToken } = response.data; // Assuming the response has access_token
        console.log('Access Token:', accessToken);

        // Cache token in localStorage
        // const adminDetails = {  accessToken };
        // localStorage.setItem("adminDetails", JSON.stringify(adminDet ails));
        localStorage.setItem("adminDetails", JSON.stringify(response.data));

        // Return access token or full response if needed
        return { accessToken }; // Or return full response if needed
      } catch (error: any) {
        console.log({ error });
        const errorResponse = handleError(error);
        return thunkAPI.rejectWithValue(errorResponse);
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
            console.log({ error, });
            const errorResponse = handleError(error);
            thunkAPI.rejectWithValue(errorResponse);
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
                console.log({ error, });
                const errorResponse = handleError(error);
                thunkAPI.rejectWithValue(errorResponse);
            }
    });
}

export default AuthAPI;