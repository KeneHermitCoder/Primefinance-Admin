import { Reveal } from "../../components";
import { images, } from "../../constants";
import { useState, useEffect, } from "react";
import { Link, useLocation } from "react-router-dom";

export function Login() {
  // const dispatch = useDispatch();
  const location = useLocation();
  const [, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [adminDetails, setAdminDetails] = useState({ email: "", password: "" });
  const isLoading = false;

  const updateAdminDetails = (propToChange: string, value: string) => {
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      [propToChange]: value,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      console.log(adminDetails);
      setSuccess(true);
    } catch (err: any) {
      console.log(err);
      setErrMsg(err.message);
    }
  };

  useEffect(() => {
    const prevPage = location.state?.from?.pathname || "/";
    if (success === true) window.location.href = prevPage;
  }, [success]);

  const content = isLoading ? (
    // <DefaultLoader loading={isLoading} />
    <>Default Loader</>
  ) : (
    <Reveal>
      <div className="h-screen w-full flex flex-col items-center justify-center gap-3">
        <div className="py-5 flex flex-col items-center">
          <img src={images.logoPNG} alt="logo" className="w-[100px] hidden" />
          <h1 className="text-xl font-normal text-gray-600">
            Admin Panel - Login
          </h1>
        </div>
        <form
          onSubmit={handleLogin}
          className="w-[517px] flex flex-col gap-[20px]"
        >
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
          <div className='mt-4'>
            <button
              type="button"
              className="w-full max-w-[517px] h-[55px] px-[18px] py-[18px] border rounded-md bg-[#089C48] font-inter text-white text-base font-medium leading-[19.36px] text-center underline-offset-0"
            >
              Login
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
