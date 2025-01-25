import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError,  } from '../../utils';
import { primebase } from '../../lib/primebase';
import {
    SignOut,
    // AdminUserAttributes,
    SignInWithPasswordCredentials,
} from '@supabase/supabase-js';

class AuthAPI {

    register = createAsyncThunk(
        'admin/register',
        async (registrationDetails: {
            email: string;
            firstname: string;
            lastname: string;
            password: string;
            phone: string;
            bvn: string;
            nin: string;
            dob: string;
        }, thunkAPI) => {
            console.log({ registrationDetails, })
            
            try {
                const { data, error, } = await primebase.auth.createAdmin(registrationDetails);
                if(error){
                    thunkAPI.rejectWithValue(handleError(error));
                }
                return data;
            } catch (error: any) {
                console.log({ error, });
                const errorResponse = handleError(error);
                thunkAPI.rejectWithValue(errorResponse);
            }
        });

    login = createAsyncThunk('admin/login', async (loginDetails: SignInWithPasswordCredentials, thunkAPI) => {
        const { data, error, } = await primebase.auth.login(loginDetails);
        console.log({ loginDetails, data, })
        if (error) {
            console.log({ error1: error, });
            const errorResponse = handleError(error);
            console.log({ error2: error, errorResponse, });
            return thunkAPI.rejectWithValue(errorResponse);
        } else return data;
    });

    logout = createAsyncThunk('admin/logout', async (logoutDetails: SignOut, thunkAPI) => {
        const { error, } = await primebase.auth.logout();
        if (error) {
            console.log({ error1: error, logoutDetails, });
            const errorResponse = handleError(error);
            console.log({ error2: error, errorResponse, });
            return thunkAPI.rejectWithValue(errorResponse);
        } else {
            console.log({ logoutDetails, });
            return;
        };
    });
}

export default AuthAPI;