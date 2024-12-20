// import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import useAccessToken from "../features/hooks/useAccessToken";
// import useTokenRefresh from '../features/hooks/useRefreshToken';

const ProtectedRoute = () => {
  const location = useLocation();
  // const dispatch = useDispatch();
  // const { refreshToken } = useTokenRefresh();
  // Check for valid accessToken on App load and trigger token refresh if necessary
  // const accessToken = useAccessToken('get');
  const accessToken = false;

  return (
    //if refreshToken operation is successful
    <>
      {accessToken ? (
        <Outlet />
      ) : (
        // (async() => {
        // 	const refreshTokenResponse = await refreshToken(accessToken);
        // 	console.log('yuwebcduib');
        // 	console.log({refreshTokenResponse});
        // 	if (refreshTokenResponse.data.status === 'success') {
        // 		return (
        // 			//if refreshToken operation is successful
        // 			<Outlet />
        // 		);
        // 	} else {
        // 		console.error('Token refresh failed:', error);
        // 		//* navigate to login screen
        // 		return (
        // 			<Navigate to='login' state={{from: location}} replace/>		// redirect to the login screen
        // 		)
        // 	}
        // })()
        // <>{navigate('')}</>
        <Navigate to="login" state={{ from: location }} replace />
      )}
    </>
  );
  // const { user } = useSelector((state) => state.adminState);
  // returns child route elements
};
export default ProtectedRoute;
