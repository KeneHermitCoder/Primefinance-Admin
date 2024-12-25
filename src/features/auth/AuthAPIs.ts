import { supabaseClient, } from '../../utils';
import { createAsyncThunk, } from '@reduxjs/toolkit';
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials, } from '@supabase/supabase-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (errorObject: any, data?: any) =>
    !errorObject.code ?
        {
            status: 500,
            type: 'error',
            statusText: 'Network error',
            data: data !== undefined && data !== null ? data : []
        }
        :
        {
            status: errorObject.code,
            type: 'error',
            statusText: errorObject.message,
            data: data !== undefined && data !== null ? data : []
        };

class AuthAPI {
    register = createAsyncThunk('admin/register', async (registrationDetails: SignUpWithPasswordCredentials, thunkAPI) => {
        console.log({ registrationDetails, })
        const { data, error, } = await supabaseClient.auth.signUp(registrationDetails);
        if (error) {
            console.log({ error });
            const errorResponse = handleError(error);
            return thunkAPI.rejectWithValue(errorResponse);
        } else return data;
    });

    login = createAsyncThunk('admin/login', async (loginDetails: SignInWithPasswordCredentials, thunkAPI) => {
        const { data, error, } = await supabaseClient.auth.signInWithPassword(loginDetails);
        console.log({ loginDetails, data, })
        if (error) {
            console.log({ error1: error, });
            const errorResponse = handleError(error);
            console.log({ error2: error, errorResponse, });
            return thunkAPI.rejectWithValue(errorResponse);
        } else return data;
    });
}

export default AuthAPI;