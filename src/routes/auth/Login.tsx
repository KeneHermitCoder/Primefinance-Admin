import { images } from "../../constants";
import { Reveal } from "../../components";
import { RootState } from "../../features";
import { useState, useEffect } from "react";
import { AuthAPI } from "../../features/auth";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector, } from "react-redux";
import { Link, useLocation, useNavigate, } from "react-router-dom";
import useLocalStorage from "../../features/hooks/useLocalStorage";

export function Login() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, error, success, admin } = useSelector(
    (state: RootState) => state.auth
  );

  const [adminDetails, setAdminDetails] = useState({ email: "", password: "" });

  const updateAdminDetails = (propToChange: string, value: string) => {
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      [propToChange]: value,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(new AuthAPI().login(adminDetails));
  };

  useEffect(() => {

    const prevPage = location.state?.from?.pathname ?? "/";

    if (success && admin) {
      toast("Login successful");
      // setTimeout(() => window.location.href = prevPage, 2000);
      setTimeout(() => navigate(prevPage), 2000);
    } else if (useLocalStorage('get', 'adminDetails')) navigate(prevPage);

    if (error) toast.error(error);
  }, [success, error, admin]);

  const content = (
    <Reveal>
      <div className="h-screen w-full px-8 flex flex-col items-center justify-center gap-3">
        <ToastContainer />
        <div className="py-5 flex flex-col items-center">
          <img src={images.logo1} alt="logo" className="w-[70px] md:w-[90px] mb-4" />
          <h1 className="text-xl font-normal text-gray-600">
            Admin Panel - Login
          </h1>
        </div>
        <form className="w-full max-w-2xl flex flex-col gap-[20px] px-3 md:px-8">
          <div>
            <label htmlFor="email" className="hidden">
              Email
            </label>
            <input
              onChange={(e) => updateAdminDetails("email", e.target.value)}
              value={adminDetails.email}
              type="email"
              id="email"
              placeholder="Email"
              required
              autoComplete="false"
              className="w-full h-[55px] px-[18px] py-[18px] border rounded-md bg-gray-100 focus:outline-[#089C48] focus:outline-1 font-inter text-gray-600 text-base font-normal leading-[19.36px] text-left underline-offset-0"
            />
          </div>
          <div>
            <label htmlFor="email" className="hidden">
              Password
            </label>
            <input
              onChange={(e) => updateAdminDetails("password", e.target.value)}
              value={adminDetails.password}
              type="password"
              id="password"
              placeholder="Password"
              required
              autoComplete="false"
              className="w-full h-[55px] px-[18px] py-[18px] border rounded-md bg-gray-100 focus:outline-[#089C48] focus:outline-1 font-inter text-gray-600 text-base font-normal leading-[19.36px] text-left underline-offset-0"
            />
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleLogin}
              className={`flex justify-center w-full h-[55px] px-[18px] py-[18px] border rounded-md bg-[#089C48] font-inter text-white text-base font-medium leading-[19.36px] text-center underline-offset-0`}
            >
              {isLoading ? (
                <span className="flex h-6 w-6 mb-2 border-2 border-white border-b-transparent rounded-full transition-all animate-spin"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="w-full flex items-center justify-center gap-2 py-8">
          <p>Don't have an account?</p>
          {/* <Link to="/" className="text-[#089C48] underline"> */}
          <Link to="/#" className="text-[#089C48] underline">
            Register
          </Link>
        </div>
      </div>
    </Reveal>
  );

  return content;
}