export default function handleError(errorObject: any, data?: any) {
    return !errorObject.code ?
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
            statusText: errorObject.message || 'An error occurred...!',
            data: data !== undefined && data !== null ? data : []
        };
}