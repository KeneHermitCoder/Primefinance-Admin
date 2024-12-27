import { useEffect } from "react";
import { toast } from "react-toastify";
import { Reveal } from "../../components";
import { Button, Stack } from "@mui/material";
import { AuthAPI } from "../../features/auth";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken, RootState } from "../../features";
import { useLocation, useNavigate } from "react-router-dom";
import { mainTabSwitch, tabSwitch } from "../../features/navigation";

export function Logout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, error, success } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(new AuthAPI().logout(getAccessToken()));
  }

  const handleCancelLogout = () => {
    const prevPage = location.state?.from?.pathname || "/";
    dispatch(
      tabSwitch(prevPage === "/" ? "dashboard" : prevPage.split("/")[1])
    );
    dispatch(
      mainTabSwitch(prevPage === "/" ? "dashboard" : prevPage.split("/")[1])
    );
    navigate(prevPage);
  }

  useEffect(() => {
    if (success === true) {
      toast("Logout successful");
      setTimeout(() => (window.location.href = '/login'), 2000);
    }
    if (error) toast.error('Error logging out...');
  }, [success, error]);

  return (
    <>
      <Reveal>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          padding={2}
        >
          <Stack
            direction="column"
            spacing={4}
            className="bg-white w-full max-w-md p-6 rounded-[10px]"
          >
            <p className="text-lg">Are you sure you want to logout?</p>
            <Stack direction="row" spacing={3}>
              <Button
                // component='button'
                variant="contained"
                color="primary"
                onClick={handleCancelLogout}
              >
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={handleLogout}>
                {isLoading ? (
                  <span className="h-6 w-6 animate-spin rounded-full border-b-2 border-x-2 border-white border-t-transparent"></span>
                ) : (
                  "Logout"
                )}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}