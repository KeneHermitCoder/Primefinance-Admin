import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, supabaseClient, } from '../../utils';
import { AdminUserAttributes, SignInWithPasswordCredentials, SignOut, } from '@supabase/supabase-js';

class AuthAPI {
    register = createAsyncThunk('admin/register', async (registrationDetails: AdminUserAttributes, thunkAPI) => {
        console.log({ registrationDetails, })
        // const { data, error, } = await supabaseClient.auth.signUp(registrationDetails);
        const { data, error, } = await supabaseClient.auth.admin.createUser(registrationDetails);
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

    logout = createAsyncThunk('admin/logout', async (logoutDetails: SignOut, thunkAPI) => {
        const { error, } = await supabaseClient.auth.signOut();
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