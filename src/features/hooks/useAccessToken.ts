/* eslint-disable react-hooks/rules-of-hooks */
import useLocalStorage from './useLocalStorage';

export function useAccessToken (action: 'get' | 'set', payload?: string | object) {
    const admin = useLocalStorage('get', 'adminDetails');
    if (action === 'get') {
        const accessToken = admin?.access_token;
        return accessToken?? null;
    }
    if (action === 'set') {
        if (admin) {
            const newAdminDetails: unknown = {
                ...admin,
                accessToken: payload
            }
            return useLocalStorage('set', { name: 'adminDetails', value: newAdminDetails });
        }
    }
};

export default useAccessToken;