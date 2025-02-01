export function useAccessToken(action: 'get' | 'set', payload?: string) {
    if (action === 'get') {
      const adminDetails = localStorage.getItem('adminDetails');
      if (adminDetails) {
        try {
          const parsedAdmin = JSON.parse(adminDetails);
          return parsedAdmin?.accessToken ?? null;
        } catch (error) {
          console.error("Error parsing admin details from localStorage", error);
          return null;
        }
      }
      return null;
    }
  
    if (action === 'set' && payload) {
      const adminDetails = localStorage.getItem('adminDetails');
      if (adminDetails) {
        try {
          const parsedAdmin = JSON.parse(adminDetails);
          parsedAdmin.accessToken = payload;
          localStorage.setItem('adminDetails', JSON.stringify(parsedAdmin));
        } catch (error) {
          console.error("Error updating access token in localStorage", error);
        }
      } else {
        console.warn("No existing admin details found in localStorage");
      }
    }
  }
  
  export default useAccessToken;
  