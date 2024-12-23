import { images } from "../../constants";
import { RootState } from "../../features";
import { useState, useEffect } from "react";
import { AuthAPI } from "../../features/auth";
import { Link, useLocation, } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Reveal } from "../../components";

// const login = new AuthAPI().login;

export function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, error, success } = useSelector(
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
    const prevPage = location.state?.from?.pathname || "/";
    console.log({ prevPage, });
    if (success === true) {
      // navigate(prevPage);
      toast("Login successful");
      setTimeout(() => window.location.href = prevPage, 2000);
    }
    if (error) toast.error(error);
  }, [success, error]);

  const content = (
    <Reveal>
      <div className="h-screen w-full flex flex-col items-center justify-center gap-3">
        <ToastContainer />
        <div className="py-5 flex flex-col items-center">
          <img src={images.logoPNG} alt="logo" className="w-[100px] hidden" />
          <h1 className="text-xl font-normal text-gray-600">
            Admin Panel - Login
          </h1>
        </div>
        <form className="w-[517px] flex flex-col gap-[20px]">
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
              className="w-full max-w-[517px] h-[55px] px-[18px] py-[18px] border rounded-md bg-gray-100 focus:outline-[#089C48] focus:outline-1 font-inter text-gray-600 text-base font-normal leading-[19.36px] text-left underline-offset-0"
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
              className="w-full max-w-[517px] h-[55px] px-[18px] py-[18px] border rounded-md bg-gray-100 focus:outline-[#089C48] focus:outline-1 font-inter text-gray-600 text-base font-normal leading-[19.36px] text-left underline-offset-0"
            />
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleLogin}
              className={`flex justify-center w-full max-w-[517px] h-[55px] px-[18px] py-[18px] border rounded-md bg-[#089C48] font-inter text-white text-base font-medium leading-[19.36px] text-center underline-offset-0`}
            >
              {isLoading ? (
                <span className="flex h-6 w-6 mb-2 border-2 border-white border-b-transparent rounded-full transition-all animate-spin"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="w-1/3 flex items-center justify-center gap-2 py-8">
          <p>Don't have an account?</p>
          <Link to="/register" className="text-[#089C48] underline">
            Register
          </Link>
        </div>
      </div>
    </Reveal>
  );

  return content;
}
