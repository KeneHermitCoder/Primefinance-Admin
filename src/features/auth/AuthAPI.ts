import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, supabaseClient, httpClient, } from '../../utils';
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
            // const { data, error, } = await supabaseClient.auth.signUp(registrationDetails);
            // const { data, error, } = await supabaseClient.auth.admin.createUser(registrationDetails);
            // if (error) {
            //     console.log({ error });
            //     const errorResponse = handleError(error);
            //     return thunkAPI.rejectWithValue(errorResponse);
            // } else return data;
            try {
                const response = await httpClient({
                    url: 'users/create-admin',
                    method: 'POST',
                    data: {
                        dob: registrationDetails.dob as string,
                        email: registrationDetails.email as string,
                        phone: registrationDetails.phone as string,
                        name: registrationDetails.firstname as string,
                        surname: registrationDetails.lastname as string,
                        password: registrationDetails.password as string,
                    }
                });
                console.log({ response, })
                return response;
            } catch (error: any) {
                console.log({ error, });
                const errorResponse = handleError(error);
                thunkAPI.rejectWithValue(errorResponse);
            }
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