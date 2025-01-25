import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError,  } from '../../utils';
import { primebase } from '../../lib/primebase';
class AuthAPI {

    register = createAsyncThunk(
        'admin/register',
        async (registrationDetails: {
            email: string;
            name: string;
            surname: string;
            password: string;
            phone: string;
            dob: string;
        }, thunkAPI) => {
            console.log({ registrationDetails, })
            
            try {
                const { data, error, } = await primebase.auth.createAdmin(
                    {
                        email: registrationDetails.email,
                        name: registrationDetails.name,
                        surname: registrationDetails.surname,
                        password: registrationDetails.password,
                        phone: registrationDetails.phone,
                        dob: registrationDetails.dob
                    }
                );
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

    login = createAsyncThunk('admin/login', async (loginDetails: {email: string, password: string}, thunkAPI) => {
        const { data, error, } = await primebase.auth.login(loginDetails.email, loginDetails.password );
        console.log({ loginDetails, data, })
        if (error) {
            console.log({ error1: error, });
            const errorResponse = handleError(error);
            console.log({ error2: error, errorResponse, });
            return thunkAPI.rejectWithValue(errorResponse);
        } else return data;
    });

    logout = createAsyncThunk('admin/logout', async (_, thunkAPI) => {
        const { error, } = await primebase.auth.logout();
        if (error) {
           
            const errorResponse = handleError(error);
       
            return thunkAPI.rejectWithValue(errorResponse);
        } else {
        
            return true;
        };
    });
}

export default AuthAPI;