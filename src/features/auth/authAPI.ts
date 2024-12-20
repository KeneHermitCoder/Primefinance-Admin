import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const process = 'DEV';
const baseUrl =
    process === 'PROD'
        ? 'https://backend-api.yoris.africa:3208/admin'  // for production
        : 'http://localhost:3108/admin';               // for development

const handleError = (errorObject, data) =>
	!errorObject.response?
		{
			status: 500,
			type: 'error',
			statusText: 'Network error',
			data: data !== undefined && data !== null? data: []
		}
	:
		{
			status: errorObject.response.status,
			type: 'error',
			statusText: errorObject.response.statusText,
			data: data !== undefined && data !== null? data: []
		};

const handleSuccess = (responseObject, data) => ({
  status: responseObject.status,
  statusText: responseObject.status,
  data: data !== undefined && data !== null ? data : responseObject.data.data,
  // data: data?? responseObject.data.data;
});
class authAPI {
    register = createAsyncThunk('admin/register', async (registrationDetails) => {
        try {
            const response = await axios.post(`${baseUrl}/`, registrationDetails);
            console.log('uibwuicbui')
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    });
    login = createAsyncThunk('admin/login', async (loginDetails) => {
        try {
            console.log({loginDetails})
            const response = await axios.post(`${baseUrl}/login`, loginDetails);
            console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            console.log({error});
			const errorResponse = handleError(error);
			return thunkAPI.rejectWithValue(errorResponse);
        }
    });
};

export default authAPI;